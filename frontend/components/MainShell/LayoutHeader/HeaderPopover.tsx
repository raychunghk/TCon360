import useStore from '@/components/stores/zstore';
import { ActionIcon, Button, Grid, Popover, Text } from '@mantine/core';
import { IconSquareRoundedX, IconUser } from '@tabler/icons-react';
import { format, parseISO } from 'date-fns';
import React, { memo, useEffect, useState } from 'react';
import styles from '@/styles/MainShell.module.css';

interface UserField {
  label: string;
  value: string | number;
  subValue?: string;
  subValue2?: string;
}

function HeaderPopover() {
  const [openedPop, setOpenedPop] = useState(false);
  const [userFields, setUserFields] = useState<UserField[] | null>(null);

  // Optimize Zustand selectors to subscribe only to specific state slices
  const activeStaff = useStore((state) => state.activeStaff);
  const activeContract = useStore((state) => state.activeContract);
  const activeUserName = useStore((state) => state.activeUser?.name);
  const staffVacation = useStore((state) => state.staffVacation);

  useEffect(() => {
    if (activeStaff && activeContract && staffVacation) {
      setUfields();
    }
  }, [activeStaff, activeContract, staffVacation]);

  // Remove empty useEffect; initialization is handled above
  const handleOpen = () => {
    setOpenedPop(true);
  };

  const handleClose = () => {
    setOpenedPop(false);
  };

  const formatDate = (dateString: string | undefined) => {
    if (dateString) {
      const date = parseISO(dateString);
      return format(date, 'yyyy-MMM-dd');
    }
    return '';
  };

  function setUfields() {
    setUserFields([
      { label: 'Staff Name:', value: activeStaff?.StaffName || '' },
      { label: 'Agent Name:', value: activeStaff?.AgentName || '' },
      { label: 'Staff Category:', value: activeStaff?.StaffCategory || '' },
      { label: 'Department:', value: activeStaff?.Department || '' },
      { label: 'Post Unit:', value: activeStaff?.PostUnit || '' },
      { label: 'Manager Name:', value: activeStaff?.ManagerName || '' },
      { label: 'Manager Title:', value: activeStaff?.ManagerTitle || '' },
      { label: 'Manager Email:', value: activeStaff?.ManagerEmail || '' },
      {
        label: 'Contract Start Date:',
        value: formatDate(activeContract?.ContractStartDate),
      },
      {
        label: 'Contract End Date:',
        value: formatDate(activeContract?.ContractEndDate),
      },
      {
        label: 'Annual Leave:',
        value: `Total: ${activeContract?.AnnualLeave || 0}`,
        subValue: `Used: ${staffVacation ? staffVacation.used : 0}`,
        subValue2: `Available: ${staffVacation && activeContract ? activeContract.AnnualLeave - staffVacation.used : 0}`,
      },
    ]);
  }

  return (
    <Popover
      width={390}
      trapFocus
      position="bottom"
      withArrow
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
          {activeUserName || 'User'}
        </Button>
      </Popover.Target>
      <Popover.Dropdown className={styles.PopoverDropdown} style={{ borderRadius: '8px !important' }}>
        <ActionIcon
          variant="filled"
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            zIndex: '1',
          }}
          onClick={handleClose}
        >
          <IconSquareRoundedX color="white" />
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

export default memo(HeaderPopover);