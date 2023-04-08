import { Grid, TablePagination } from "@mui/material";
import React, { useState } from "react";
import styled from "@emotion/styled";
import ListCard from "./ListCard";
import FilterSection from "./FilterSection";
import { elasticSearchApi } from "../../api/searchApi";
import MainLayout from "../../components/layouts/MainLayout";
import emptyData from "../../assets/emptyData.png";
import LoadingBackdrop from "../../components/Loader/LoadingBackDrop";

const Wrapper = styled(Grid)(({ theme }) => ({
  padding: "90px 20px 0px 20px",
  background: "#F2F3F4",
}));

const CompanyList = () => {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const Companies = detail?.map((item) => {
    return item["_source"];
  });
  const handleFilterChange = async (
    location,
    includeTerm,
    excludeTerm,
    revenue,
    employee,
    includeIndustry,
    excludeIndustry
    // query
  ) => {
    const token = localStorage.getItem("authToken");
    const res = await elasticSearchApi(
      token,
      location,
      includeTerm,
      excludeTerm,
      revenue,
      employee,
      includeIndustry,
      excludeIndustry,
      // query,
      page,
      rowsPerPage
    );
    if (res) {
      if (res?.status === 200) {
        setDetail(res?.data?.hits?.hits);
        setTotalRows(res?.data?.hits?.total?.value);
        setLoading(false);
      } else {
        setLoading(true);
      }
    }
  };

  return (
    <MainLayout
      search={searchQuery}
      setSearch={setSearchQuery}
      setPage={setPage}
    >
      <LoadingBackdrop open={loading} />
      <Wrapper>
        <FilterSection
          handleFilterChange={handleFilterChange}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          query={searchQuery}
          setLoading={setLoading}
        />
        {loading || totalRows === 0 ? (
          <Grid sx={{ ml: "340px" }}>
            <img src={emptyData} alt="empty" width="100%" />
          </Grid>
        ) : (
          <Grid sx={{ ml: "340px" }}>
            {Companies?.map((company, key) => (
              <ListCard key={key} loading={loading} company={company} />
            ))}
            <TablePagination
              sx={{ display: "flex", justifyContent: "center" }}
              component=""
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        )}
      </Wrapper>
    </MainLayout>
  );
};

export default CompanyList;
