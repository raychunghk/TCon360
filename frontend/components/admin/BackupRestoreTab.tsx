import { useState } from 'react';
import { Text, Button, LoadingOverlay, TextInput, Card, Box, Tooltip, Group, Input, FileInput, Divider, Flex, Paper } from '@mantine/core';
import commonstyle from '/styles/common.module.css';
import MyModal from '@/components/MyModal';
import useStore from '@/components/stores/zstore';
import { useShallow } from 'zustand/react/shallow';
import axios, { AxiosError } from 'axios';
import { IconCloudDownload, IconJson, IconUpload } from '@tabler/icons-react';
import { parseCookies } from 'nookies';

const BackupRestoreTab = () => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState('');
    const [jsonFile, setJsonFile] = useState(null);
    const [basepath] = useStore(useShallow((state) => [state.basepath]));

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleFileChange = (file) => {
        if (file && file.type === 'application/json') {
            setJsonFile(file);
        } else {
            setJsonFile(null);
            setModalMsg('Only JSON files are allowed.');
            setModalOpen(true);
        }
    };

    const handleBackup = async () => {
        const api = `${basepath}/api/admin/userbackup`;
        setLoading(true);

        try {
            const cookies = parseCookies();
            const tokenCookie = cookies.token;
            console.log('token cookie', tokenCookie);
            const headers = { Authorization: `Bearer ${tokenCookie}` };
            console.log('header?', headers);
            const response = await axios.get(api, {
                headers,
            });
            const fileName = 'backup.json';
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setModalMsg('Backup downloaded successfully.');
            setModalOpen(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios Error:', error.message);
                setModalMsg(`Error: ${error.response?.data.message || error.message}`);
            } else {
                console.error('Unexpected Error:', error);
                setModalMsg('An unexpected error occurred.');
            }
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleRestore = async () => {
        if (!jsonFile) {
            setModalMsg('Please select a JSON file to restore.');
            setModalOpen(true);
            return;
        }

        const api = `${basepath}/api/admin/user-restore`;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('jsonFile', jsonFile);
            const response = await axios.post(api, formData);

            if ([200, 201].includes(response.status)) {
                console.log('User data restored successfully.');
                setModalMsg(response.data.message);
                setModalOpen(true);
            } else {
                console.error('Error restoring user data:', response.statusText);
                setModalMsg(`Error: ${response.statusText}`);
                setModalOpen(true);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios Error:', error.message);
                if (error.response) {
                    setModalMsg(`Error: ${error.response.data.message || error.message}`);
                } else if (error.request) {
                    setModalMsg('Error: No response from server.');
                } else {
                    setModalMsg(`Error: ${error.message}`);
                }
            } else {
                console.error('Unexpected Error:', error);
                setModalMsg('An unexpected error occurred.');
            }
            setModalOpen(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maw={650} pos="relative">
            <LoadingOverlay visible={loading} overlayProps={{ radius: 'sm', blur: 2 }} />
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section p="sm" className={commonstyle.adminSectionHeader}>
                    <Text size="xl" fw={700} color="white">
                        Backup and Restore
                    </Text>
                </Card.Section>
                <Flex direction="column" gap="sm" mt="md">
                    <Paper mt="sm" bd="1px solid gray.3" p='md'>
                        <FileInput
                            label="Restore from JSON file"
                            placeholder="Select a JSON file"
                            leftSection={<IconJson />}
                            onChange={handleFileChange}
                        />
                        <Button color="green" leftSection={<IconUpload />} onClick={handleRestore}>
                            Restore
                        </Button>
                    </Paper>
                    <Divider my="sm" />
                    <Paper bd={'2px'} p='md' bd="1px solid gray.3">
                        <Button color="blue" aria-label="Backup" leftSection={<IconCloudDownload />} onClick={handleBackup}>
                            Backup Data
                        </Button></Paper>


                </Flex>

                <MyModal open={modalOpen} onClose={handleModalClose} msg={modalMsg} />
            </Card>
        </Box>
    );
};

export default BackupRestoreTab;