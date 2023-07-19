import { useState, useEffect } from 'react';
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
  Card,
  Stepper,
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
  };
  const [formValues, setFormValues] = useState(staffModel);
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const { classes } = useStyles();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  // const nextStep = () =>
  //   setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const mainpage = '/';
  const maxAge = process.env.TOKEN_MAX_AGE;
  console.log('_maxage?');
  console.log(maxAge);
  console.log('formValues');
  console.log(formValues);
  const form = useForm({
    initialValues: { ...formValues, username, password, email },
    validate: (values) => {
      if (active === 0) {
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
    console.log('form?');
    console.log(form);
    const { email, password, username, ...staff } = form;
    const user = { email, password, username, staff };
    setFormValues({ ...staff });

    console.log('form values');
    console.log(formValues);
    console.log('user');
    console.log(user);

    try {
      const response = await fetch(`${basepath}/api/user/signup`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // router.push(mainpage);
        await handleLoginSuccess(response, router);
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

            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
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
                  {`${active}`}
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
