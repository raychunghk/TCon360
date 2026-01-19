'use client';
import { default as useRouter } from '@/components/useCustRouter';
import { CSSProperties, SetStateAction, useEffect, useRef, useState } from 'react';

import * as classes from '@/styles/login.css';
import {
  Anchor,
  Button,
  Container,
  Grid,
  Group,
  LoadingOverlay,
  Notification,
  NumberInput,
  Paper,
  PasswordInput,
  Stepper,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import Head from 'next/head';

import Signupcard from '@/components/Signupcard';
import { useForm } from '@mantine/form';
import Link from 'next/link';
//import { handleLoginSuccess } from '@/components/handleLoginSuccess';
import { useLogin } from '@/components/handleLoginSuccess';
import {
  excludeHoliday,
  myRenderDay,
} from '@/components/util/leaverequest.util';
import { DatePickerInput } from '@mantine/dates';
import { getHotkeyHandler, useHotkeys } from '@mantine/hooks';

import { IconX } from '@tabler/icons-react';
import axios from 'axios';

import { usePublicHolidays } from '@/components/hooks/usePublicHolidays';
import useUIStore from '@/components/stores/useUIStore';
import useStore from '@/components/stores/zstore.ts';
export default function SignupPage() {
  interface iStaffModel {
    StaffName: string;
    AgentName: string;
    StaffCategory: string;
    Department: string;
    PostUnit: string;
    ManagerName: string;
    ManagerTitle: string;
    ManagerEmail: string;
    ContractStartDate: String | null;
    ContractEndDate: String | null;
    AnnualLeave: String;
  }
  const staffModel = {
    StaffName: '',
    AgentName: '',
    StaffCategory: '',
    Department: '',
    PostUnit: '',
    ManagerName: '',
    ManagerTitle: '',
    ManagerEmail: '',
    ContractStartDate: null,
    ContractEndDate: null,
    AnnualLeave: 10,
  };

  const [formValues, setFormValues] = useState(staffModel);
  const { handleLoginSuccess } = useLogin();
  //const [loading, setLoading] = useState(false); // State to handle loading overlay
  const router = useRouter();
  //  const basepath = router.basePath;

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpError, setsignUpError] = useState('');
  const { publicHolidays, loading, loadPublicHolidays } = usePublicHolidays();
  //const inputRefs = useRef([]);
  const inputRefs = useRef<(HTMLInputElement | HTMLButtonElement | null)[]>([]);
  const datePickerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { siteTitle } = useUIStore();
  const { authOverlayVisible, setAuthOverlayVisible, basepath } = useStore();
  const mainpage = '/';

  // In nextStep
  const nextStep = async () => {
    if (active === 0) {
      const isValid = await validateStep0(form.values.username, form.values.email);
      if (!isValid) return;
    }
    const errors = await form.validate();
    if (form.validate().hasErrors) return;
    setActive((current) => (current < 3 ? current + 1 : current));
    if (active === 3) handleSubmit(form.values);
  };
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    if (active >= 1) {
      inputRefs.current[0]?.focus();
    }
  }, [active]);

  useHotkeys([['mod+Enter', nextStep]]);

  const maxAge = process.env.TOKEN_MAX_AGE;

  const form = useForm({
    initialValues: { ...formValues, username, password, email },
    validate: (values) => {
      if (active === 0) {
        const rtn = {
          username:
            values.username.trim().length < 6
              ? 'Username must include at least 6 characters'
              : null,
          password:
            values.password.length < 5 ? 'Password must include at least 6 characters' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
        return rtn;
      } else if (active === 1) {
        const errors: Partial<iStaffModel> = {};
        if (!values.StaffName) {
          errors.StaffName = 'Staff Name is required';
        }
        if (!values.AgentName) {
          errors.AgentName = 'Agent Name is required';
        }
        if (!values.StaffCategory) {
          errors.StaffCategory = 'Staff Category is required';
        }
        if (!values.Department) {
          errors.Department = 'Department is required';
        }
        if (!values.PostUnit) {
          errors.PostUnit = 'Post Unit is required';
        }
        if (!values.AnnualLeave) {
          errors.AnnualLeave = 'AnnualLeave is required';
        }
        if (values.ContractEndDate && values.ContractStartDate) {
          const endDate = new Date(values.ContractEndDate);
          const startDate = new Date(values.ContractStartDate);
          //  const minDate = new Date('1900-01-01');

          if (endDate <= startDate) {
            errors.ContractEndDate = 'Contract end date should be later than Contract start date and valid';
          }
        }
        console.log(`error on step ${active}`, errors);
        return errors;
      } else if (active === 2) {
        const errors: Partial<iStaffModel> = {};

        if (!values.ManagerName) {
          errors.ManagerName = 'Manager Name is required';
        }
        if (!values.ManagerTitle) {
          errors.ManagerTitle = 'Manager Title is required';
        }
        if (!values.ManagerEmail) {
          errors.ManagerEmail = 'Manager Email is required';
        } else if (!/^\S+@\S+$/.test(values.ManagerEmail)) {
          errors.ManagerEmail = 'Invalid email format';
        }

        return errors;
      } else {
        return {};
      }
    },
  });

  const handleInputChange = (event) => {
    console.log(`handle input change`, formValues);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
  async function handleSubmit(form: typeof formValues & { username: string; password: string; email: string }) {
    setAuthOverlayVisible(true);
    const { email, password, username, ...staff } = form;
    setFormValues({ ...staff });
    try {
      const response = await fetch(`${basepath}/api/user/signup`, {
        method: 'POST',
        body: JSON.stringify({ email, password, username, staff }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        await handleLoginSuccess(response);
      } else if (response.status === 400) {
        const data = await response.json();
        setsignUpError(data.message || 'Username or email already exists');
        setActive(0);
        window.scrollTo(0, 0);
      } else {
        setsignUpError('Failed to sign up: Server error');
      }
    } catch (error) {
      setsignUpError('Failed to sign up: Server error');
    } finally {
      setAuthOverlayVisible(false);
    }
  };
  const validateStep0 = async (_username: string, _email: string) => {
    try {
      const response = await axios.post(`${basepath}/api/user/validateuser`, {
        username: _username,
        email: _email,
      });
      if (response.data.message === 'ok') {
        setErrorMessage('');
        return true;
      } else {
        setErrorMessage('Username or email already exists');
        return false;
      }
    } catch (error) {
      setErrorMessage('Error validating user');
      return false;
    }
  };

  // In handleStepClick
  const handleStepClick = (stepIndex: number) => {
    if (stepIndex === 1) {
      const isValid = validateStep0(form.values.username, form.values.email);
      if (!isValid) return;
    }
    setActive(stepIndex);
  };


  const hotkeyConfig: [string, () => void][] = [['mod+Enter', nextStep]];

  const handleTabKey = (event, stepStartIndex, stepEndIndex) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const currentIndex = inputRefs.current.indexOf(event.target);
      if (currentIndex !== -1) {
        const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;

        if (nextIndex > stepEndIndex) {
          // Wrap around to the first field in the current step
          inputRefs.current[stepStartIndex]?.focus();
        } else if (nextIndex < stepStartIndex) {
          // Wrap around to the last field in the current step
          inputRefs.current[stepEndIndex]?.focus();
        } else {
          inputRefs.current[nextIndex]?.focus();
        }
      }
    }
  };
  return (
    <>
      <Head>
        <Title>{siteTitle} - Create an account!</Title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <Link rel="shortcut icon" href={`${basepath ?? ''}/favicon.svg`} />
      </Head>
      <Container
        fluid
        className={classes.wrapper}
        style={
          {
            '--login-bg-image': `url('${basepath ?? ''}/images/loginbg1.webp')`,
          } as CSSProperties
        }
      >
        <form
          onSubmit={form.onSubmit((e) => {
            handleSubmit(e);
          })}
        >
          <Paper className={classes.form} maw={'800px'} radius={0} p={25}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb="md">
              Create an Account
            </Title>

            <Stepper active={active} onStepClick={handleStepClick}
            //breakpoint="sm"
            >
              <Stepper.Step label="First step" description="Enter login details">
                <Paper shadow="sm" p="xs" withBorder>
                  <Title order={2}  >
                    Enter login details
                  </Title>
                  <Grid pb={10} pt={10}>
                    {[
                      {
                        component: TextInput,
                        label: 'Email Address',
                        placeholder: 'username@department.gov.hk',
                        value: email,
                        onChange: (event: { target: { value: SetStateAction<string> } }) =>
                          setEmail(event.target.value),
                        name: 'email',
                      },
                      {
                        component: TextInput,
                        label: 'User Name',
                        placeholder: 'User Name',
                        value: username,
                        onChange: (event) => setUsername(event.target.value),
                        name: 'username',
                      },
                      {
                        component: PasswordInput,
                        label: 'Password',
                        placeholder: 'Your Password',
                        value: password,
                        onChange: (event) => setPassword(event.target.value),
                        name: 'password',
                      },
                    ].map((field, index) => {
                      const InputComponent = field.component;
                      const autoFocus = active === 0 && index === 0;
                      return (
                        <Grid.Col span={6} key={field.name}>
                          <InputComponent
                            label={field.label}
                            placeholder={field.placeholder}
                            size="md"
                            value={field.value}
                            //   onChange={field.onChange}
                            onKeyDown={(event) => {
                              getHotkeyHandler(hotkeyConfig)(event);
                              handleTabKey(event, 0, 2);
                            }}
                            {...form.getInputProps(field.name, {
                              onChange: (event) => {
                                field.onChange(event);
                                // Additional onChange logic if needed
                              }
                            })}
                            ref={(ref) => {
                              inputRefs.current[index] = ref;
                            }}
                            autoFocus={autoFocus}
                          />
                        </Grid.Col>
                      );
                    })}
                  </Grid>

                  {errorMessage && (
                    <Notification
                      color="red"
                      title="Error"
                      onClose={() => setErrorMessage('')}
                      style={{ marginTop: '1rem' }}
                    >
                      {errorMessage}
                    </Notification>
                  )}
                </Paper>
              </Stepper.Step>
              {publicHolidays && <Stepper.Step label="Second step" description="T-contract Staff Details">
                <Paper shadow="sm" p="xs" withBorder>
                  <Title order={2}  >
                    T-contract Staff Details
                  </Title>
                  <Grid pb={10} pt={10}>
                    {[
                      {
                        label: 'Name of Staff',
                        placeholder: 'Name of Staff',
                        name: 'StaffName',
                        value: formValues.StaffName,
                      },
                      {
                        label: 'Name of T-contractor',
                        placeholder: 'Name of T-contractor',
                        name: 'AgentName',
                        value: formValues.AgentName,
                      },
                      {
                        label: 'Staff category',
                        placeholder: 'Staff category',
                        name: 'StaffCategory',
                        value: formValues.StaffCategory,
                      },
                      {
                        label: 'Department',
                        placeholder: 'Department',
                        name: 'Department',
                        value: formValues.Department,
                      },
                      {
                        label: 'Post unit',
                        placeholder: 'Post unit',
                        name: 'PostUnit',
                        value: formValues.PostUnit,
                      },
                      {
                        label: 'Contract Start Date',
                        placeholder: 'Contract Start Date',
                        name: 'ContractStartDate',
                        value: formValues.ContractStartDate,
                        type: 'datetime',
                      },
                      {
                        label: 'Contract End Date',
                        placeholder: 'Contract End Date',
                        name: 'ContractEndDate',
                        value: formValues.ContractEndDate,
                        type: 'datetime',
                      },
                      {
                        label: 'Total Annual Leave',
                        placeholder: 'Total Annual Leave',
                        name: 'AnnualLeave',
                        value: formValues.AnnualLeave,
                        type: 'number',
                      },
                    ].map((field, index) => {
                      const isDateTime = field.type === 'datetime';
                      const isNumber = field.type === 'number';
                      const refIndex = index + 3; // Adjust the index as needed
                      const _stepid = 2;
                      const autoFocus = refIndex === 3 && active === 1;
                      const wrappedExcludeDate = (date: string): boolean => {
                        const result = excludeHoliday(date);
                        // Cast to boolean, treating null/undefined as false
                        return result === true; // Explicitly convert to boolean, defaulting others to false
                      };
                      return (
                        <Grid.Col span={6} key={field.name}>
                          {isDateTime ? (
                            <DatePickerInput
                              autoFocus={autoFocus}
                              clearable
                              label={field.label}
                              placeholder={field.placeholder}
                              name={field.name}
                              //onChange={handleInputChange}
                              value={field.value}
                              valueFormat="DD-MM-YYYY"
                              firstDayOfWeek={0}
                              {...form.getInputProps(field.name, {
                                onChange: (event) => {
                                  handleInputChange(event);
                                  // Additional onChange logic if needed
                                }
                              })}
                              excludeDate={wrappedExcludeDate}
                              renderDay={myRenderDay}
                              ref={(ref) => {
                                inputRefs.current[refIndex] = ref;
                              }}
                              onKeyDown={(event) => {
                                getHotkeyHandler(hotkeyConfig)(event);
                                handleTabKey(event, 3, 10);
                              }}
                            />
                          ) : isNumber ? (
                            <NumberInput autoFocus={autoFocus}
                              label={field.label}
                              placeholder={field.placeholder}
                              name={field.name}


                              value={field.value}
                              min={0}
                              onKeyDown={(event) => {
                                getHotkeyHandler(hotkeyConfig)(event);
                                handleTabKey(event, 3, 10);
                              }}
                              {...form.getInputProps(field.name, {
                                onChange: (event) => {
                                  handleInputChange(event);
                                  // Additional onChange logic if needed
                                }
                              })}
                              ref={(ref) => {
                                inputRefs.current[refIndex] = ref;
                              }}
                            />
                          ) : (
                            <TextInput autoFocus={autoFocus}
                              label={field.label}
                              placeholder={field.placeholder}
                              name={field.name}
                              //   onChange={handleInputChange}
                              value={field.value}
                              onKeyDown={(event) => {
                                getHotkeyHandler(hotkeyConfig)(event);
                                handleTabKey(event, 3, 10);
                              }}
                              {...form.getInputProps(field.name, {
                                onChange: (event) => {
                                  handleInputChange(event);
                                  // Additional onChange logic if needed
                                }
                              })}
                              ref={(ref) => {
                                inputRefs.current[refIndex] = ref;
                              }}
                            />
                          )}
                        </Grid.Col>
                      );
                    })}
                  </Grid>
                </Paper>
              </Stepper.Step>}
              <Stepper.Step label="Final step" description="Timesheet Certifying Officer">
                <Paper shadow="sm" p="xs" withBorder>
                  <Title order={2}>Timesheet Certifying Officer</Title>
                  <Grid pb={10} pt={10}>
                    {[
                      {
                        label: 'Manager name',
                        placeholder: 'Manager name',
                        name: 'ManagerName',
                        value: formValues.ManagerName,
                      },
                      {
                        label: 'Designation(Manager post title)',
                        placeholder: 'Designation(Manager post title)',
                        name: 'ManagerTitle',
                        value: formValues.ManagerTitle,
                      },
                      {
                        label: 'Manager email',
                        placeholder: 'Manager email',
                        name: 'ManagerEmail',
                        value: formValues.ManagerEmail,
                      },
                    ].map((field, index) => {
                      const refIndex = index + 11; // Adjust the starting index based on previous fields
                      const autoFocus = refIndex === 11 && active === 2;
                      return (
                        <Grid.Col span={6} key={field.name}>
                          <TextInput autoFocus={autoFocus}
                            label={field.label}
                            placeholder={field.placeholder}
                            name={field.name}
                            //  onChange={handleInputChange}
                            onKeyDown={(event) => {
                              getHotkeyHandler(hotkeyConfig)(event);
                              handleTabKey(event, 11, 13); // Adjust indices for the final step
                            }}
                            value={field.value}
                            {...form.getInputProps(field.name, {
                              onChange: (event) => {
                                handleInputChange(event);
                                // Additional onChange logic if needed
                              }
                            })}
                            ref={(ref) => {
                              inputRefs.current[refIndex] = ref;
                            }}
                          />
                        </Grid.Col>
                      );
                    })}
                  </Grid>
                </Paper>
              </Stepper.Step>
              <Stepper.Completed>
                <Paper shadow="sm" p="md" withBorder>
                  <LoadingOverlay
                    visible={authOverlayVisible}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                  />

                  <Title order={2}>Please review the signup info:</Title>
                  {signUpError && (
                    <Notification
                      icon={<IconX size="1.2rem" />}
                      withBorder
                      color="red"
                      radius="md"
                      title="Error"
                    >
                      {signUpError}
                    </Notification>
                  )}
                  <Signupcard
                    title="User Information"
                    cols={[
                      {
                        label: 'Login Name',
                        value: form.values.username,
                        span: 2,
                        valspan: 4,
                      },
                      {
                        label: 'User Email',
                        value: form.values.email,
                        span: 2,
                        valspan: 4,
                      },
                    ]}
                  />
                  <Signupcard
                    title="T-contract Staff Details"
                    cols={[
                      {
                        label: 'Name of Staff',
                        value: form.values.StaffName,
                        span: 3,
                        valspan: 9,
                      },

                      {
                        label: 'Name of T-contractor',
                        value: form.values.AgentName,
                        span: 3,
                        valspan: 9,
                      },
                      {
                        label: 'Staff Category',
                        value: form.values.StaffCategory,
                        span: 3,
                        valspan: 9,
                      },
                      {
                        label: 'Department',
                        value: form.values.Department,
                        span: 3,
                        valspan: 3,
                      },
                      {
                        label: 'Post Unit',
                        value: form.values.PostUnit,
                        span: 3,
                        valspan: 3,
                      },
                    ]}
                  />
                  <Signupcard
                    title="Timesheet Certifying Officer"
                    cols={[
                      { label: 'Signature', value: '', span: 3, valspan: 3 },
                      {
                        label: 'Name',
                        value: form.values.ManagerName,
                        span: 2,
                        valspan: 4,
                      },
                      {
                        label: 'Designation',
                        value: form.values.ManagerTitle,
                        span: 2,
                        valspan: 4,
                      },
                      {
                        label: 'Email',
                        value: form.values.ManagerEmail,
                        span: 2,
                        valspan: 4,
                      },
                    ]}
                  />
                </Paper>
              </Stepper.Completed>
            </Stepper>

            <Group justify="center" mt="xl">
              {active !== 0 && (
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
              )}
              {active !== 3 && (
                <Button variant="light" onClick={nextStep}>
                  Next step (Ctrl+Enter)
                </Button>
              )}
              {active === 3 && (
                <>
                  <Button type="submit">Sign Up</Button>
                </>
              )}
            </Group>

            <Text ta="center" mt="md">
              Already have an account?{' '}
              <Anchor<'a'> href={`${basepath}/login`} fw={700}>
                Login
              </Anchor>
            </Text>
          </Paper>
        </form>
      </Container>
    </>
  );
}
SignupPage.getInitialProps = async (ctx) => {
  return {
    title: 'Create new account',
  };
};
