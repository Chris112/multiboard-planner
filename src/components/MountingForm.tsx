import LearnMoreIcon from "@mui/icons-material/Info";
import {
  Box,
  Chip,
  FormControl,
  FormLabel,
  Grid,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import { mountingTypeConfig, MountingTypeID } from "../config/mounting";
import { useGlobalStore } from "../lib/globalStore/globalStore";

function MountingForm() {
  const { mountType, setMountType } = useGlobalStore((state) => ({
    mountType: state.mountType,
    setMountType: state.setMountType,
  }));

  return (
    <Sheet sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography level="title-lg">Mounting</Typography>
            <Chip
              variant="outlined"
              startDecorator={<LearnMoreIcon />}
              slotProps={{
                action: {
                  component: "a",
                  target: "_blank",
                  href: "https://www.multiboard.io/knowledge-hub/mounting-systems",
                },
              }}
            >
              More Mounting info
            </Chip>
          </Box>
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Mount Type</FormLabel>
            <Select
              value={mountType}
              onChange={(_event, newValue) =>
                newValue && setMountType(newValue as MountingTypeID)
              }
            >
              {Object.entries(mountingTypeConfig).map(
                ([mountingTypeID, mountingTypeConfig]) => (
                  <Option key={mountingTypeID} value={mountingTypeID}>
                    {mountingTypeConfig.label}
                  </Option>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Sheet>
  );
}
export default MountingForm;
