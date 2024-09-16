'use client'
import 'mantine-react-table/styles.css';
import { useMemo, useEffect, useState } from 'react';
import { Text, Card } from '@mantine/core';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from 'mantine-react-table';
import axios from 'axios';
import commonstyle from '@/styles/common.module.css';

import { useShallow } from 'zustand/react/shallow';
import useStore from '@/components/stores/zstore';
type UserRole = {
  userId: string;
  username?: string;
  name: string;
  email: string;
  roleId: number;
  roleName: string;
  userStatus: string;
};
type Role = { id: number; name: string };
type ValidationErrors = {
  name?: string;
  email?: string;
};
const UserManagementTab = () => {
  const [userData, setUserData] = useState<UserRole[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolenames, setRoleNames] = useState([]);
  const [basepath] = useStore(useShallow((state) => [state.basepath]));
  const [rolesLoaded, setRolesLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const [emailerr, setemailerr] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${basepath}/api/admin/users`);
        const data = await response.json();
        setUserData(data.users);
        setRoles(data.roles);
        setRoleNames(data.roles.map((r) => r.name));
        console.log('rolenaemms', rolenames)
        console.log('roles?', data.roles);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    if (basepath) fetchUserData();
  }, []);



  const columns: MRT_ColumnDef<UserRole>[] = useMemo(
    () => [
      {
        accessorKey: 'userId',
        header: 'User ID',
        size: 80,
        enableEditing: false,
      },

      {
        accessorKey: 'username',
        header: 'Username',
        size: 150,
        enableEditing: false,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
        mantineEditTextInputProps: {
          error: validationErrors.name,
        },
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
        mantineEditTextInputProps: {
          type: 'email',
          onChange: (event) => {
            const value = event.target.value;
            //validation logic
            if (!value) {
              setemailerr('email required');
              setValidationErrors((prev) => ({
                email: 'Age is required',
              }));
            } else {
              setemailerr('');
              delete validationErrors.email;
              setValidationErrors({ ...validationErrors });
            }
          },
          required: true,
          error: `${validationErrors?.email ?? ''}`,
          //remove any previous validation errors when user focuses on the input
        },
      },
      {
        accessorKey: 'roleId',
        header: 'Role ID',
        size: 80,
        enableEditing: false,
      },
      {
        accessorKey: 'roleName',
        header: 'Role Name',
        size: 150,
        editVariant: 'select',
        mantineEditSelectProps: {
          data: ['staff', 'admin'],
        },
      },
      {
        accessorKey: 'userStatus',
        header: 'User Status',
        size: 150,
        editVariant: 'select',
        mantineEditSelectProps: {
          data: ['active', 'suspended'],
        },
      },
    ],
    [],
  );
  const handleSaveRow = async (rowEditEvent) => {
    setSaving(true);
    const { row, values, exitEditingMode } = rowEditEvent;
    console.log('row', row);
    console.log('values', values);
    // Validate user
    setValidationErrors({});
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => !!error)) {
      setValidationErrors(newValidationErrors);
      setSaving(false);
      return;
    }
    setValidationErrors({});

    const _roleid = roles.filter((f) => f.name === values.roleName)[0].id;
    if (!values.hasOwnProperty('userId')) {
      // Insert the "roleId" property with a value
      values.userId = row
        .getAllCells()
        .filter((x) => x.column.id == 'userId')[0]
        .getValue();
    }
    if (!values.hasOwnProperty('roleId')) {
      // Insert the "roleId" property with a value
      values.roleId = row
        .getAllCells()
        .filter((x) => x.column.id == 'roleId')[0]
        .getValue();
    }

    try {
      const response = await axios.put(`${basepath}/api/admin/updateuser/${values.userId}`, {
        name: values.name,
        email: values.email,
        roleId: _roleid,
        userStatus: values.userStatus,
      });

      if (response.status === 200) {
        const updatedUserData = response.data;
        setUserData((prevUserData) =>
          prevUserData.map((user) =>
            user.userId === updatedUserData.userId ? updatedUserData : user
          )
        );
        userData[row.index] = values;
        setUserData([...userData]);
        console.log('User updated successfully:', updatedUserData);
      } else {
        console.error('Failed to update user:', response.statusText);
      }
      exitEditingMode();
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setSaving(false);
    }
  };

  const table = useMantineReactTable({
    columns,
    displayColumnDefOptions: { 'mrt-row-actions': { size: 200 } },
    data: userData,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    onEditingRowSave: handleSaveRow, // Assign the function to onEditingRowSave prop
    enableColumnResizing: true,

    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: 'last',

    initialState: {
      columnVisibility: {
        userId: false, //hide firstName column by default
        roleId: false,
        'mrt-row-expand': false, //hide row expand column by default
      },
      density: 'xs',
    },
    enableRowNumbers: true,
    //rowNumberMode: 'static', //default
    mantineTableContainerProps: {
      style: {
        minHeight: '500px',
      },
    },
    state: {
      isLoading: loading,
      isSaving: saving,
    },
  });

  function validateUser(val: UserRole) {
    const goodemail = validateEmail(val.email);
    if (!goodemail) {
      setemailerr('incorrect email');
    }
    const rtn = {
      email: !goodemail ? 'Incorrect Email Format' : undefined,
      name: !validateName(val.name) ? 'Invalid name' : undefined,
    };
    console.log('validation result:', rtn);
    return rtn;
  }
  const validateName = (name: string) => {
    console.log('name length', name.length);
    return name.length > 0;
  };
  const validateEmail = (email: string) =>
    !!email.length &&
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );



  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      className="clsUsrMgr"
      withBorder
      style={{ width: '1300px', height: '93%' }}
    >
      <Card.Section p="sm" mb="10px" className={commonstyle.adminSectionHeader}>
        <Text size="xl" fw={700} color="white">
          User Manager
        </Text>
      </Card.Section>

      <MantineReactTable table={table} />
    </Card>
  );
};

export default UserManagementTab;
