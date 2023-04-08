import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Breadcrumbs, TablePagination, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import CompanyModal from "../../../components/UpdateCompanyModal";
import DeletePopover from "../../../components/DeletePopup";
import { deleteCompany, getCompanyDetail, getCompanyList } from "../../../api/companyApi";
import LoadingBackdrop from "../../../components/Loader/LoadingBackDrop";
import MainLayout from "../../../components/layouts/MainLayout";

const BreadcrumbsWrapper = styled(Breadcrumbs)(({ theme }) => ({
  margin: "80px 0 30px 0",
  background: "#F2F3F4",
  padding: "20px",
}));

export default function CompanyData() {
  const token = localStorage.getItem("authToken");
  const [companyDetail, setCompanyDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState();
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [companyData, setCompanyData] = useState({
    "Company_ID": "",
    "Company_Name": "",
    "Headquarters": "",
    "Phone": "",
    "Website": "",
    "Employees": "",
    "Stock_Symbol": "",
    "Ticker": "",
    "Revenue": "",
    "Siccode": "",
    "Naicscode": "",
    "Description": "",
    "Industry": "",
    "Company_url": "",
    "Company_Logo_URL": ""
  })

  const handleClick = (params) => {
    setCompanyId(params.id);
    setAnchorEl(true);
  };
  const handleDelete = async () => {
    const res = await deleteCompany(token, companyId);
    if (res) {
      if (res?.status === 200) {
        setAnchorEl(false);
      } else {
        alert("Something went wrong!")
      }
    }
  };
  const handleOpen = async (params) => {
    setCompanyId(params.id);
    setOpen(true);
    const res = await getCompanyDetail(token, params.id);
    if (res) {
      if (res?.status === 200) {
        setCompanyData(res?.data);
      } else {
        alert('Something went wrong!')
      }
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const handleApi = async () => {
      const res = await getCompanyList(token, page, rowsPerPage);
      if (res) {
        if (res?.status === 200) {
          setCompanyDetail(res?.data?.[0]);
          setTotalRows(res?.data?.[1]?.totalCount);
          setLoading(false);
        } else {
          alert("Something went wrong!");
        }
      }
    };
    handleApi();
  }, [page, rowsPerPage,anchorEl, open]);
  const columns = [
    {
      field: "Company_ID",
      headerName: "ID",
      width: 200,
      flex: 1,
      sortable: true,
    },
    {
      field: "Company_Name",
      headerName: "Company Name",
      width: 300,
      flex: 1,
      sortable: true,
    },
    {
      field: "Employees",
      headerName: "Total Employee",
      width: 200,
      flex: 1,
      sortable: true,
    },
    {
      field: "Headquarters",
      headerName: "Country",
      width: 300,
      flex: 1,
      sortable: true,
    },
    {
      field: "Website",
      headerName: "Website",
      width: 500,
      flex: 1,
      sortable: true,
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
        <CompanyModal
          open={open}
          setOpen={setOpen}
          companyId={companyId}
          companyData={companyData}
          setCompanyData={setCompanyData}
          setLoading={setLoading}
        />
        <DeletePopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleDelete={handleDelete}
        />
        <BreadcrumbsWrapper>
          
          <Typography color="text.primary">Companies</Typography>
          <Typography color="text.primary">Data</Typography>
        </BreadcrumbsWrapper>
        <div style={{ height: 900, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.Company_ID}
            rows={companyDetail}
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
