SELECT
  u.id AS userId,
  u.username,
  u.name,
  u.email,
  u.userStatus,
  u.roleId,
  r.name AS roleName
FROM
  User AS u
  JOIN Role AS r ON u.roleId = r.id;