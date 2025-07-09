import { Card, SimpleGrid, Text, useMantineTheme } from '@mantine/core';

export interface Staff {
    id: number;
    StaffName: string;
    AgentName?: string;
    StaffCategory?: string;
}

interface LeaveRequestStaffInfoProps {
    staff: Staff | null;
}

export function LeaveRequestStaffInfo({ staff }: LeaveRequestStaffInfoProps) {
    const theme = useMantineTheme();

    return (
        <Card
            shadow="sm"
            padding="md"
            radius="md"
            bg={theme.colors.gray[0]}
            withBorder

        >
            <SimpleGrid
                cols={2}
                spacing={theme.spacing.md}

            >
                <div>
                    <Text fw={700} size="md" color={theme.colors.dark[7]}>
                        Staff Name
                    </Text>
                    <Text fw={400} size="sm" color={theme.colors.dark[6]}>
                        {staff?.StaffName ?? 'N/A'}
                    </Text>
                </div>
                <div>
                    <Text fw={700} size="md" color={theme.colors.dark[7]}>
                        Agent Name
                    </Text>
                    <Text fw={400} size="sm" color={theme.colors.dark[6]}>
                        {staff?.AgentName ?? 'N/A'}
                    </Text>
                </div>
                <div>
                    <Text fw={700} size="md" color={theme.colors.dark[7]}>
                        Staff Category
                    </Text>
                    <Text fw={400} size="sm" color={theme.colors.dark[6]}>
                        {staff?.StaffCategory ?? 'N/A'}
                    </Text>
                </div>
            </SimpleGrid>
        </Card>
    );
}