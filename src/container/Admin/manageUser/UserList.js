import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Breadcrumbs, TablePagination, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { Edit, Delete, Tag } from "@mui/icons-material";
import DeletePopover from "../../../components/DeletePopup";
import LoadingBackdrop from "../../../components/Loader/LoadingBackDrop";
import UserModal from "../../../components/UpdateUserModal";
import { deleteUser, getUserDetail, getUserList } from "../../../api/userApi";
import MainLayout from "../../../components/layouts/MainLayout";

const BreadcrumbsWrapper = styled(Breadcrumbs)(({ theme }) => ({
  margin: "80px 0 30px 0",
  background: "#F2F3F4",
  padding: "20px",
}));

export default function UserData() {
  const token = localStorage.getItem("authToken");
  const [userDetail, setuserDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userId, setUserId] = useState();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    role: ""
  });
  const handlePageChange = (event, newPage) => {
      setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClick = (params) => {
    console.log("paramssss", params);
    setUserId(params?.row?.email);
    setAnchorEl(true);
  };

  const handleDelete = async () => {
    const res = await deleteUser(token, userId);
    if (res) {
      if (res?.status === 200) {
        setAnchorEl(false);
      } else {
        alert("Something went wrong!")
      }
    }
  };

  const handleOpen = async (params) => {
    setUserId(params?.row?.email);
    setOpen(true);
    const res = await getUserDetail(token, params?.row?.email);
    if (res) {
      if (res?.status === 200) {
        setFormData(res?.data);
      } else {
        alert('Something went wrong!')
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const handleApi = async () => {
      const token = localStorage.getItem("authToken");
      const res = await getUserList(token, page, rowsPerPage);
      if (res) {
        if (res?.status === 200) {
          setuserDetail(res?.data?.[0]);
          setTotalRows(res?.data?.[1]?.totalCount);
          setLoading(false);
        } else {
          alert("Something went wrong!");
        }
      }
    };
    handleApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, anchorEl, open]);

  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 300,
      flex: 1,
      sortable: true,
    },
    {
      field: "first_name",
      headerName: "Name",
      width: 300,
      flex: 1,
      sortable: true,
    },
    {
      field: "company",
      headerName: "Company",
      width: 200,
      flex: 1,
      sortable: true,
    },
    {
      field: "role_name",
      headerName: "Role",
      width: 500,
      flex: 1,
      sortable: true,
      valueGetter: (params) => params.row.role.role_name,
    },
    {
      field: "is_active",
      headerName: "Is_Active",
      width: 300,
      flex: 1,
      sortable: true,
      renderCell: (params) => {
        <div>
          {params?.row?.is_active === false ?
            <Tag color='red'>{params?.row?.is_active}</Tag>
            : <Tag color='green'>{params?.row?.is_active}</Tag>}
        </div>
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton aria-label="edit">
            <Edit onClick={() => handleOpen(params)} />
          </IconButton>
          <IconButton aria-label="delete">
            <Delete onClick={() => handleClick(params)} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <Box sx={{ ml: 11, mr: 4, mt: 9, mb: 2 }} >
        <LoadingBackdrop open={loading} />
        <UserModal open={open} setOpen={setOpen} userId={userId} formData={formData} setFormData={setFormData} />
        <DeletePopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleDelete={handleDelete} />
        <BreadcrumbsWrapper>
          <Typography color="text.primary">User</Typography>
          <Typography color="text.primary">Data</Typography>
        </BreadcrumbsWrapper>
        <div style={{ height: 900, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={userDetail}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            hideFooter={true}
          />
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </MainLayout>
  );
}
