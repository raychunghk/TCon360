'use client';

import {
  ActionIcon,
  Button,
  Grid,
  Popover,
  Text,
} from '@mantine/core';
import { IconSquareRoundedX, IconUser } from '@tabler/icons-react';
import { format, parseISO } from 'date-fns';
import React, { memo, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import * as classes from './HeaderPopover.css';

import useStore from '@/components/stores/zstore';


interface UserField {
  label: string;
  value: string | number;
  subValue?: string;
  subValue2?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Component                                    */
/* -------------------------------------------------------------------------- */
function HeaderPopover() {
  const [opened, setOpened] = useState(false);

  /* ----------------------- Combined Zustand selector ---------------------- */
  const { activeUser, activeContract, activeUserName, staffVacation } =
    useStore(
      useShallow((state) => ({
        activeUser: state.activeUser,

        activeContract: state.activeContract,
        activeUserName: state.activeUser?.name,
        staffVacation: state.staffVacation,
      }))
    );

  /* ---------------------------- Helper functions -------------------------- */
  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    return format(parseISO(dateString), 'yyyy-MMM-dd');
  };
  const activeStaff = activeUser?.staff[0];

  /* -------------------------- Build user fields -------------------------- */
  const userFields = useMemo<UserField[]>(() => {
    if (!activeStaff || !activeContract || !staffVacation) return [];

    const used = staffVacation.used ?? 0;
    const total = activeContract.AnnualLeave ?? 0;

    return [
      { label: 'Staff Name:', value: activeStaff.StaffName ?? '' },
      { label: 'Agent Name:', value: activeStaff.AgentName ?? '' },
      { label: 'Staff Category:', value: activeStaff.StaffCategory ?? '' },
      { label: 'Department:', value: activeStaff.Department ?? '' },
      { label: 'Post Unit:', value: activeStaff.PostUnit ?? '' },
      { label: 'Manager Name:', value: activeStaff.ManagerName ?? '' },
      { label: 'Manager Title:', value: activeStaff.ManagerTitle ?? '' },
      { label: 'Manager Email:', value: activeStaff.ManagerEmail ?? '' },
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
        value: `Total: ${total}`,
        subValue: `Used: ${used}`,
        subValue2: `Available: ${total - used}`,
      },
    ];
  }, [activeStaff, activeContract, staffVacation]);

  /* ---------------------------------------------------------------------- */
  return (
    <Popover
      width={390}
      position="bottom"
      withArrow
      trapFocus
      opened={opened}
      onChange={setOpened}
      onClose={() => setOpened(false)}
    >
      {/* --------------------------- Trigger button -------------------------- */}
      <Popover.Target>
        <Button
          variant="filled"
          color="indigo"
          onMouseEnter={() => setOpened(true)}
          className={classes.PopoverButton}
        >
          <IconUser size={18} style={{ marginRight: '0.5rem' }} />
          {activeUserName ?? 'User'}
        </Button>
      </Popover.Target>

      {/* ----------------------------- Dropdown ----------------------------- */}
      <Popover.Dropdown
        className={classes.PopoverDropdown}
        style={{ borderRadius: 8 }}
      >
        <ActionIcon
          variant="filled"
          onClick={() => setOpened(false)}
          style={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}
        >
          <IconSquareRoundedX color="white" />
        </ActionIcon>

        <Grid gutter="sm">
          {userFields.map((field, idx) => (
            <React.Fragment key={idx}>
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
          ))}
        </Grid>
      </Popover.Dropdown>
    </Popover>
  );
}

export default memo(HeaderPopover);