import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, SessionProvider } from 'next-auth/react';
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
  Grid,
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
    maxWidth: 600,
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
    ManagerEmail: '',
  };
  const [formValues, setFormValues] = useState(staffModel);
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const { classes } = useStyles();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [session, loading] = useSession();
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const mainpage = '/';
  console.log('formValues');
  console.log(formValues);
  const form = useForm({
    initialValues: formValues,
    validate: {
      email: isEmail('Please enter a valid email address'),
      username: isNotEmpty('Please enter a username'),
      password: isNotEmpty('Please enter a password'),
      StaffName: hasLength(
        { min: 2, max: 50 },
        'Name must be 2-50 characters long',
      ),
      AgentName: isNotEmpty('Please enter a Agent name'),
      StaffCategory: isNotEmpty('Please enter a staff category'),
      Department: isNotEmpty('Please enter a department'),
      PostUnit: isNotEmpty('Please enter a post unit'),
      ManagerName: hasLength(
        { min: 2, max: 50 },
        'Name must be 2-50 characters long',
      ),
      ManagerTitle: hasLength(
        { min: 2, max: 50 },
        'Title must be 2-50 characters long',
      ),
      ManagerEmail: isEmail('Please enter a valid email address'),
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
        <Title>Signup - Create an account!</Title>
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
              mt="ms"
              mb="md"
            >
              Create an Account
            </Title>
            <TextInput
              label="Email address"
              placeholder="hello@gmail.com"
              size="md"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              {...form.getInputProps('email')}
            />
            <TextInput
              label="Username"
              placeholder="johndoe"
              size="md"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              {...form.getInputProps('password')}
            />
            <Grid pb={30} pt={30}>
              <Grid.Col span={6}>
                <TextInput
                  label="Staff Name"
                  placeholder="Staff name"
                  name="StaffName"
                  onChange={handleInputChange}
                  disabled={!editing}
                  value={formValues.StaffName}
                  {...form.getInputProps('StaffName')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Agent name"
                  placeholder="Agentname"
                  name="AgentName"
                  onChange={handleInputChange}
                  disabled={!editing}
                  value={formValues.AgentName}
                  {...form.getInputProps('AgentName')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Staff category"
                  placeholder="Staff category"
                  name="StaffCategory"
                  onChange={handleInputChange}
                  disabled={!editing}
                  value={formValues.StaffCategory}
                  {...form.getInputProps('StaffCategory')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Department"
                  placeholder="Department"
                  name="Department"
                  onChange={handleInputChange}
                  disabled={!editing}
                  value={formValues.Department}
                  {...form.getInputProps('Department')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Post unit"
                  placeholder="Post unit"
                  name="PostUnit"
                  onChange={handleInputChange}
                  disabled={!editing}
                  value={formValues.PostUnit}
                  {...form.getInputProps('PostUnit')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Manager name"
                  placeholder="Manager name"
                  name="ManagerName"
                  onChange={handleInputChange}
                  disabled={!editing}
                  value={formValues.ManagerName}
                  {...form.getInputProps('ManagerName')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Manager title"
                  placeholder="Manager title"
                  name="ManagerTitle"
                  onChange={handleInputChange}
                  disabled={!editing}
                  value={formValues.ManagerTitle}
                  {...form.getInputProps('ManagerTitle')}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Manager email"
                  placeholder="Manager email"
                  name="ManagerEmail"
                  onChange={handleInputChange}
                  disabled={!editing}
                  value={formValues.ManagerEmail}
                  {...form.getInputProps('ManagerEmail')}
                />
              </Grid.Col>
            </Grid>
            {/* <StaffFormGrid
            formValues={formValues}
            handleInputChange={handleInputChange}
            editing={editing}
            form={form}
          /> */}
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            {/* <Button fullWidth mt="xl" size="md" onClick={handleSubmit}>
              Sign Up
            </Button> */}
            <Button fullWidth mt="xl" size="md" type="submit">
              Sign Up
            </Button>
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
