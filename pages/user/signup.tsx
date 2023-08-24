import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSession, SessionProvider } from 'next-auth/react';
import UserStyle from '../../styles/User.module.css';
import {
  Paper,
  createStyles,
  TextInput,
  Container,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  Grid,
  Divider,
  Notification,
  Stepper,
  NumberInput,
} from '@mantine/core';
import bg from 'public/images/loginbg1.webp';
import StaffFormGrid from '../../components/StaffFormGrid';
import Head from 'next/head';
import { basepath } from '/global';
import Link from 'next/link';
import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from '@mantine/form';
import Signupcard from '../../components/Signupcard';
import { handleLoginSuccess } from './handleLoginSuccess';
import { DatePickerInput, DateTimePicker } from '@mantine/dates';
import {
  excludeHoliday,
  myRenderDay,
  setPublicHolidays,
} from 'components/util/leaverequest.util';
import { PublicHolidaysContext } from 'pages/_app';
import { useDispatch, useSelector } from 'react-redux';
import { UtilsContext } from 'components/util/utilCtx';
import axios from 'axios';
const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: 'cover',
    backgroundImage: `url('${bg.src}')`,
    height: '100vh',
  },
  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    maxWidth: 800,
    paddingTop: 80,
    height: '100vh',
    marginLeft: 'auto',
    marginRight: '150px',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  steptitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: '1.2em',
    alignContent: 'center',
    marginTop: '20',
    marginBottom: '20',
  },
  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function SignupPage() {
  const staffModel = {
    StaffName: '',
    AgentName: '',
    StaffCategory: '',
    Department: '',
    PostUnit: '',
    ManagerName: '',
    ManagerTitle: '',
    ManagerEmail: 'manager@1.com',
    contracts: {
      create: [
        {
          ContractStartDate: null,
          ContractEndDate: null,
          AnnualLeave: 10,
          IsActive: true,
        },
      ],
    },
  };

  const [formValues, setFormValues] = useState(staffModel);
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const { classes } = useStyles();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const nextStep = async () => {
    if (active === 0) {
      const isValid = await validateStep0(
        form.values.username,
        form.values.email,
      );
      if (!isValid) {
        return;
      }
    }
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  };
  //let publicholidays;
  useEffect(() => {}, []);
  // const nextStep = () =>
  //   setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const mainpage = '/';
  const publicholidays = useContext(PublicHolidaysContext);

  setPublicHolidays(publicholidays);
  console.log('publicholidays?', publicholidays);
  const maxAge = process.env.TOKEN_MAX_AGE;
  console.log('_maxage?', maxAge);
  console.log(maxAge);
  console.log('formValues');
  console.log(formValues);

  const form = useForm({
    initialValues: { ...formValues, username, password, email },
    validate: async (values) => {
      if (active === 0) {
        const isValid = await validateStep0(values.username, values.email);
        if (!isValid) {
          return {
            username: 'Username or email already exists',
            email: 'Username or email already exists',
          };
        }
        return {
          username:
            values.username.trim().length < 6
              ? 'Username must include at least 6 characters'
              : null,
          password:
            values.password.length < 5
              ? 'Password must include at least 6 characters'
              : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      } else if (active === 1) {
        const errors: Partial<StaffModel> = {};
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

        if (!values.contracts[0].AnnualLeave) {
          errors.AnnualLeave = 'AnnualLeave is required';
        }
        if (
          values.contracts[0].ContractEndDate <=
          values.contracts[0].ContractStartDate
        ) {
          errors.ContractEndDate =
            'Contract end date should be later than Contract start date';
        }
        return errors;
      } else if (active === 2) {
        const errors: Partial<StaffModel> = {};

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

  useEffect(() => {
    const getStaffData = async () => {
      try {
        setEditing(true);
      } catch (error) {
        console.error('Failed to fetch staff data:', error);
      }
    };

    getStaffData();
  }, []);
  const handleInputChange = (event) => {
    console.log(form);
    console.log('handle change');
    console.log(formValues);
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(form) {
    // event.preventDefault();
    console.log('form?', form);

    const { email, password, username, ...staff } = form;
    const user = { email, password, username, staff };
    setFormValues({ ...staff });

    console.log('form values', formValues);
    console.log('user', user);

    try {
      const response = await fetch(`${basepath}/api/user/signup`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // router.push(mainpage);
        await handleLoginSuccess(response, router, dispatch);
      } else if (response.status === 400) {
        // Display an error message and jump to stepper page 1
        const data = await response.json();
        console.error('Error signing up:', data.message);

        // Set the stepper activeStep to 0 (page 1)
        setActive(0);

        // Scroll to the top of the page
        window.scrollTo(0, 0);
      } else {
        console.error('Error signing up:', response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  const handleStepClick = (stepIndex) => {
    // Perform validation before switching to Step 1
    console.log('stepIndex', stepIndex);
    if (stepIndex === 1) {
      const isValid = validateStep0(form.values.username, form.values.email); // Custom validation function for Step 0
      if (!isValid) {
        return; // Do not switch to Step 1 if validation fails
      }
    }

    setActive(stepIndex);
  };

  const validateStep0 = async (_username, _email) => {
    console.log('form.values.username', form.values.username);
    // const _username = form.values.username;
    // const _email = form.values.email;
    const postval = {
      username: _username,
      email: _email,
    };
    console.log('postval', postval);
    try {
      // Make an HTTP request to the server to validate the user
      const response = await axios.post(`${basepath}/api/user/validateuser`, {
        username: _username,
        email: _email,
      });

      if (response.data.message === 'ok') {
        setErrorMessage(null);
        // Validation successful, return true
        return true;
      } else {
        // Validation failed, return false
        // You can display an error message or perform any necessary actions
        const errmsg = 'Username or email already exists';
        console.error(errmsg);
        setErrorMessage(errmsg);
        return false;
      }
    } catch (error) {
      console.error('Error validating user:', error);
      return false;
    }
  };
  return (
    <>
      <Head>
        <Title>NxTime - Create an account!</Title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <Link rel="shortcut icon" href={`${basepath}/favicon.svg`} />
      </Head>
      <Container fluid className={classes.wrapper}>
        <form
          onSubmit={form.onSubmit((e) => {
            handleSubmit(e);
          })}
        >
          <Paper className={classes.form} radius={0} p={25}>
            <Title
              order={2}
              className={classes.title}
              align="center"
              mt="md"
              mb="md"
            >
              Create an Account
            </Title>

            <Stepper
              active={active}
              onStepClick={handleStepClick}
              breakpoint="sm"
            >
              <Stepper.Step
                label="First step"
                description="Enter login details"
              >
                <Paper shadow="sm" p="xs" withBorder>
                  <Title order={1} className={classes.steptitle}>
                    Enter login details
                  </Title>
                  <Grid pb={10} pt={10}>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Email address"
                        placeholder="username@department.gov.hk"
                        size="md"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        {...form.getInputProps('email')}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInput
                        label="Username"
                        placeholder="Username"
                        size="md"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        {...form.getInputProps('username')}
                      />{' '}
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        size="md"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        {...form.getInputProps('password')}
                      />
                    </Grid.Col>
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
              <Stepper.Step
                label="Second step"
                description="T-contract Staff Details"
              >
                <Paper shadow="sm" p="xs" withBorder>
                  <Title order={2} className={classes.steptitle}>
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
                        value: formValues.contracts[0].ContractStartDate,
                        type: 'datetime', // Add a type property to identify datetime inputs
                      },
                      {
                        label: 'Contract End Date',
                        placeholder: 'Contract End Date',
                        name: 'ContractEndDate',
                        value: formValues.contracts[0].ContractEndDate,
                        type: 'datetime', // Add a type property to identify datetime inputs
                      },
                      {
                        label: 'Total Annual Leave',
                        placeholder: 'Total Annual Leave',
                        name: 'AnnualLeave',
                        value: formValues.contracts[0].AnnualLeave,
                        type: 'number',
                      },
                    ].map(({ label, placeholder, name, value, type }) => (
                      <Grid.Col span={6}>
                        {type === 'datetime' ? (
                          <DatePickerInput
                            clearable
                            label={label}
                            placeholder={placeholder}
                            name={name}
                            onChange={handleInputChange} // Replace with appropriate handler
                            value={value}
                            valueFormat="DD-MM-YYYY"
                            firstDayOfWeek={0}
                            {...form.getInputProps(name)}
                            excludeDate={excludeHoliday}
                            renderDay={myRenderDay}
                          />
                        ) : type === 'number' ? (
                          <NumberInput
                            label={label}
                            placeholder={placeholder}
                            name={name}
                            onChange={handleInputChange} // Replace with appropriate handler
                            value={value}
                            min={0}
                            {...form.getInputProps(name)}
                          />
                        ) : (
                          <TextInput
                            label={label}
                            placeholder={placeholder}
                            name={name}
                            onChange={handleInputChange}
                            value={value}
                            {...form.getInputProps(name)}
                          />
                        )}
                      </Grid.Col>
                    ))}
                  </Grid>
                </Paper>
              </Stepper.Step>
              <Stepper.Step
                label="Final step"
                description="Timesheet Certifying Officer"
              >
                <Paper shadow="sm" p="xs" withBorder>
                  <Title order={2} className={classes.steptitle}>
                    Timesheet Certifying Officer
                  </Title>
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
                    ].map(({ label, placeholder, name, value }) => (
                      <Grid.Col span={6}>
                        <TextInput
                          label={label}
                          placeholder={placeholder}
                          name={name}
                          onChange={handleInputChange}
                          value={value}
                          {...form.getInputProps(name)}
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Paper>
              </Stepper.Step>
              <Stepper.Completed>
                <Paper shadow="sm" p="md" withBorder>
                  <Title order={2}>Please review the signup info:</Title>
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

            <Group position="center" mt="xl">
              {active !== 0 && (
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
              )}
              {active !== 3 && (
                <Button variant="light" onClick={nextStep}>
                  Next step
                </Button>
              )}
              {active === 3 && (
                <>
                  <Button type="submit">Sign Up</Button>
                  {/* <Checkbox label="Keep me logged in" size="md" /> */}
                </>
              )}
            </Group>

            {/* <Button fullWidth mt="xl" size="md" onClick={handleSubmit}>
              Sign Up
            </Button> */}
            {/* <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth mt="xl" size="md" type="submit">
              Sign Up
            </Button> */}
            <Text align="center" mt="md">
              Already have an account?{' '}
              <Anchor<'a'> href={`${basepath}/login`} weight={700}>
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
    title: 'Create an account for TS Generator',
  };
};
