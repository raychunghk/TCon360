import { ActionIcon, Button, Grid, Popover, Text } from '@mantine/core';
//import { IconSquareRoundedX, IconUser } from '@tabler/icons';
import { IconSquareRoundedX, IconUser } from '@tabler/icons-react';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useState, useEffect } from 'react';

import useStore from 'pages/reducers/zstore';

export default function HeaderPopover({}) {
  const [openedPop, setOpenedPop] = useState(false);
  const [userFields, setuserFields] = useState(null);

  const {
    activeStaff,
    activeContract,
    activeUser,
    staffVacation,
    setStaffVacation,
  } = useStore();

  useEffect(() => {
    if (staffVacation) setUfields();
  }, [activeStaff, staffVacation]);
  useEffect(() => {
    setUfields();
  }, []);
  const handleOpen = () => {
    setOpenedPop(true);
  };
  //const activeContract = useStore((state) => state.activeContract);
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
  function setUfields() {
    setuserFields([
      { label: 'Staff Name:', value: activeStaff.StaffName },
      { label: 'Agent Name:', value: activeStaff.AgentName },
      { label: 'Staff Category:', value: activeStaff.StaffCategory },
      { label: 'Department:', value: activeStaff.Department },
      { label: 'Post Unit:', value: activeStaff.PostUnit },
      { label: 'Manager Name:', value: activeStaff.ManagerName },
      { label: 'Manager Title:', value: activeStaff.ManagerTitle },
      { label: 'Manager Email:', value: activeStaff.ManagerEmail },
      {
        label: 'Contract Start Date:',
        value: formatDate(activeContract.ContractStartDate),
      },
      {
        label: 'Contract End Date:',
        value: formatDate(activeContract.ContractEndDate),
      },
      {
        label: 'Annual Leave:',
        value: `Total: ${activeContract.AnnualLeave}`,
        subValue2: `Available: ${
          staffVacation ? activeContract.AnnualLeave - staffVacation.used : 0
        }`,
        subValue: `Used: ${staffVacation ? staffVacation.used : 0}`,
      },
    ]);
  }
  return (
    <Popover
      width={390}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
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
          {activeUser?.name}
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
          {userFields
            ? userFields.map((field, index) => (
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
              ))
            : ''}
        </Grid>
      </Popover.Dropdown>
    </Popover>
  );
}
