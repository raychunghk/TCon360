import styles from '../MainShell.module.css';
import { ActionIcon, Button, Grid, Popover, Text } from '@mantine/core';
//import { IconSquareRoundedX, IconUser } from '@tabler/icons';
import { IconSquareRoundedX, IconUser } from '@tabler/icons-react';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useState, useEffect } from 'react';

import useStore from '../../store/zstore';
export default function HeaderPopover({}) {
  const [openedPop, setOpenedPop] = useState(false);
  const [userFields, setuserFields] = useState(null);

  const { activeStaff, activeContract, activeUser, staffVacation } = useStore();

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
          variant="filled"
          color="indigo"
          onMouseEnter={handleOpen}
          className={styles.PopoverButton}
        >
          <IconUser
            size={18}
            style={{
              marginRight: '0.5rem',
            }}
          />
          {activeUser?.name}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className={styles.PopoverDropdown}>
        <ActionIcon
          variant="filled"
          size="md"
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            zIndex: '1',
          }}
          onClick={handleClose}
        >
          <IconSquareRoundedX size="md" color="white" />
        </ActionIcon>
        <Grid gutter="sm">
          {userFields
            ? userFields.map((field, index) => (
                <React.Fragment key={index}>
                  <Grid.Col span={5}>
                    <Text ta="right" size="sm" fw={500}>
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
