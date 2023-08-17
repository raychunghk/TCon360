import { useState } from 'react';
import axios from 'axios';
import { useForm as useReactHookForm } from 'react-hook-form';
import { MonthPicker } from '@mantine/dates';
import { Button, Card, Grid, Modal, Text, Center, Group } from '@mantine/core';
import { IconTableExport } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { basepath } from '/global';
import MyCard from '../MyCard';
import download from 'downloadjs';
export default function CreateTimesheetPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useReactHookForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileid, setfileid] = useState(false);
  const [monthValue, setMonthValue] = useState(new Date());
  const { data: session, status } = useSession();
  const onSubmit = async (event) => {
    setSubmitting(true);
    const year = monthValue.getFullYear();
    const month = monthValue.getMonth() + 1;
    const response = await axios.post(`${basepath}/api/timesheet/create`, {
      year,
      month,
    });
    setSubmitting(false);
    if ([200, 201].includes(response.status)) {
      setfileid(response.data.fileid);
      setModalOpen(true);
    } else {
      console.error('Failed to create timesheet record:', response);
    }
  };
  const handleDownloadFile = async () => {
    const url = `${basepath}/api/staff/download/${fileid}`;
    const response = await axios.get(url, { responseType: 'blob' });
    const disposition = response.headers['content-disposition'];
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    const filename = matches ? matches[1] : `${fileid}.xml`;
    download(response.data, filename);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    if (fileid) {
      handleDownloadFile();
    }
  };

  const handleMonthChange = (date) => {
    if (fileid) {
      setfileid(null);
    }
    setMonthValue(date);
  };

  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <MyCard title={'Create TimeSheet'}>
          <Grid pb={30} ta="center">
            <Grid.Col span={12}>
              <Group position="center">
                <MonthPicker
                  maxLevel="year"
                  value={monthValue}
                  onChange={handleMonthChange}
                />
              </Group>
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="center">
                {fileid && (
                  <Button
                    component="a"
                    target="_blank"
                    leftIcon={<IconTableExport size="1rem" />}
                    href={`${basepath}/api/staff/download/${fileid}`}
                  >
                    Download TimeSheet
                  </Button>
                )}
              </Group>
            </Grid.Col>
          </Grid>
          <Card.Section
            bg="indigo.2"
            py="md"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Button
              type="submit"
              fullWidth
              loading={submitting}
              maw={250}
              radius="md"
            >
              Submit
            </Button>
          </Card.Section>
        </MyCard>
      </form>
      <Modal.Root opened={modalOpen} onClose={handleModalClose}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header bg="indigo.4" c="white">
            <Modal.Title>
              <Text fw={700} fz="md">
                Success
              </Text>
            </Modal.Title>
            <Modal.CloseButton bg="indigo.2" />
          </Modal.Header>
          <Modal.Body>
            <Text mt="md">Timesheet record created successfully!</Text>
            <Center>
              <Button mt="md" onClick={handleModalClose}>
                Ok
              </Button>
            </Center>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
