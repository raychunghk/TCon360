import { ActionIcon, Button, Grid, Popover, Text } from '@mantine/core';
import { IconSquareRoundedX, IconUser } from '@tabler/icons';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderPopover({}) {
  const dispatch = useDispatch();
  const [openedPop, setOpenedPop] = useState(false);
  const { staff, user, staffVacation } = useSelector((state) => ({
    staff: state.calendar.staff,
    user: state.calendar.user,
    staffVacation: state.calendar.staffVacation,
  }));
  const handleOpen = () => {
    setOpenedPop(true);
  };

  const handleClose = () => {
    setOpenedPop(false);
  };

  const formatDate = (dateString) => {
    if (dateString) {
      const date = parseISO(dateString);
      const formattedDate = format(date, 'yyyy-MMM-dd');
      return formattedDate;
    }
  };
  const userFields = [
    { label: 'Staff Name:', value: user?.staff.StaffName },
    { label: 'Agent Name:', value: user?.staff.AgentName },
    { label: 'Staff Category:', value: user?.staff.StaffCategory },
    { label: 'Department:', value: user?.staff.Department },
    { label: 'Post Unit:', value: user?.staff.PostUnit },
    { label: 'Manager Name:', value: user?.staff.ManagerName },
    { label: 'Manager Title:', value: user?.staff.ManagerTitle },
    { label: 'Manager Email:', value: user?.staff.ManagerEmail },
    {
      label: 'Contract Start Date:',
      value: formatDate(user?.staff.ContractStartDate),
    },
    {
      label: 'Contract End Date:',
      value: formatDate(user?.staff.ContractEndDate),
    },
    {
      label: 'Annual Leave:',
      value: `Total: ${user?.staff.AnnualLeave}`,
      subValue: `Balance: ${staffVacation.balance}`,
      subValue2: `Used: ${staffVacation.used}`,
    },
  ];

  return (
    <Popover
      width={390}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
      gutter={10}
      opened={openedPop}
      onClose={handleClose}
    >
      <Popover.Target>
        <Button
          variant="link"
          onMouseEnter={handleOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'white',
            backgroundColor: '#15487E', // Subtle background color

            textDecoration: 'none',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'blue',
            },
          }}
        >
          <IconUser
            size={18}
            sx={{
              marginRight: '0.5rem',
            }}
          />
          {user?.name}
        </Button>
      </Popover.Target>
      <Popover.Dropdown
        sx={(theme) => ({
          background: ` linear-gradient(to top, #051937, #0a2448, #0e2f59, #123b6b, #15487e);`,
          borderRadius: theme.radius.md,
          color: 'white',
          boxShadow: theme.shadows.md,
          padding: theme.spacing.md,
        })}
      >
        <ActionIcon
          variant="filled"
          size="xs"
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            zIndex: '1',
          }}
          onClick={handleClose}
        >
          <IconSquareRoundedX />
        </ActionIcon>
        <Grid gutter="sm">
          {userFields.map((field, index) => (
            <React.Fragment key={index}>
              <Grid.Col span={5}>
                <Text align="right" size="sm" weight={500}>
                  {field.label}
                </Text>
              </Grid.Col>
              <Grid.Col span={7}>
                {field.subValue ? (
                  <>
                    <Text size="sm">{field.value}</Text>
                    <Text size="sm">{field.subValue}</Text>
                    <Text size="sm">{field.subValue2}</Text>
                  </>
                ) : (
                  <Text size="sm">{field.value}</Text>
                )}
              </Grid.Col>
            </React.Fragment>
          ))}
        </Grid>
      </Popover.Dropdown>
    </Popover>
  );
}