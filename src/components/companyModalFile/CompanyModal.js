import { Box, Grid, Link, Modal, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import StyledButton from "../StyledButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModalSideBar from "./ModalSideBar";
import ModalSection from "./ModalSection";

const BoxWraper = styled(Box)(({ theme }) => ({
  margin: "30px 30px",
  background: "#fff",
  height: "100%",
  position: "fixed",
  overflow: "scroll",
}));
const Box1 = styled(Grid)(({ theme }) => ({
  height: "40px",
  background: "#F2F3F4",
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));
const Box2 = styled(Grid)(({ theme }) => ({
  padding: "0 30px",
  alignItems: "center",
  height: "200px",
}));

const CompanyModal = ({ open, setOpen, companyDetail }) => {
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    setOpen(false);
  };

  const ButtonLabel = [
    { label: "Add to list", background: "#00a3d0", textColor: "#fff" },
    { label: "Search similar", background: "#fff", textColor: "#00a3d0" },
    { label: "Sync", background: "#fff", textColor: "#909497" },
    { label: <MoreVertIcon />, background: "#fff", textColor: "#000" },
  ];

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <BoxWraper>
        <Box1>
          <CloseIcon onClick={() => handleClick()} />
        </Box1>
        <Box2 container>
          <Grid item xs={12} md={6} sx={{ display: "flex", gap: 3 }}>
            <Paper
              variant="outlined"
              sx={{ padding: "10px 20px", borderRadius: 3 }}
            >
              <img
                src={companyDetail?.Company_Logo_URL}
                height="50px"
                width="50px"
                alt="logo"
              />
            </Paper>
            <div>
              <Typography variant="h4" fontWeight={600}>
                {companyDetail?.Company_Name}
              </Typography>
              <Link
                href={`http://${companyDetail?.Website}`}
                color="#00a3d0"
                fontWeight={700}
              >
                {companyDetail?.Website}
              </Link>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            {ButtonLabel?.map((item, key) => {
              return (
                <StyledButton
                  key={key}
                  label={item.label}
                  backgroundColor={item.background}
                  textColor={item.textColor}
                  onClick={handleClick}
                />
              );
            })}
          </Grid>
        </Box2>
        <Grid container sx={{ display: "flex", padding: "0 30px" }}>
          <Grid item xs={12} md={5}>
            <ModalSideBar companyDetail={companyDetail} />
          </Grid>
          <Grid item xs={12} md={7}>
            <ModalSection companyDetail={companyDetail} />
          </Grid>
        </Grid>
      </BoxWraper>
    </Modal>
  );
};
export default CompanyModal;
