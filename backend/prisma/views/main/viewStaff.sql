SELECT
  s.id AS StaffId,
  s.StaffName,
  s.AgentName,
  s.StaffCategory,
  s.Department,
  s.PostUnit,
  s.ManagerName,
  s.ManagerTitle,
  s.ManagerEmail,
  s.userId,
  sc.ContractStartDate,
  sc.ContractEndDate,
  sc.AnnualLeave,
  sc.id AS contractId
FROM
  Staff AS s
  LEFT JOIN StaffContract AS sc ON s.id = sc.staffId
WHERE
  sc.IsActive = 1
ORDER BY
  sc.ContractStartDate;