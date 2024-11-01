import {
  FormControl,
  FormLabel,
  Grid,
  Input,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import { unitConfig, UnitID } from "../config/units";
import { useGlobalStore } from "../lib/globalStore/globalStore";

function WallSizeForm() {
  const { height, units, width, setHeight, setUnits, setWidth } =
    useGlobalStore((state) => ({
      units: state.units,
      width: state.width,
      height: state.height,
      setUnits: state.setUnits,
      setWidth: state.setWidth,
      setHeight: state.setHeight,
    }));

  const handleInputChanged =
    (field: "units" | "width" | "height") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      switch (field) {
        case "units":
          setUnits(value as UnitID);
          break;
        case "width":
          setWidth(Number(value));
          break;
        case "height":
          setHeight(Number(value));
          break;
      }
    };

  return (
    <Sheet sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography level="title-lg">Wall Size</Typography>
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Units</FormLabel>
            <Select
              value={units}
              onChange={(_event, newValue) => setUnits(newValue as UnitID)}
            >
              {Object.entries(unitConfig).map(([unitID, unitConfig]) => (
                <Option key={unitID} value={unitID}>
                  {unitConfig.label}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Width</FormLabel>
            <Input
              placeholder={`Width in ${units}`}
              value={width}
              onChange={handleInputChanged("width")}
            />
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Height</FormLabel>
            <Input
              placeholder={`Height in ${units}`}
              value={height}
              onChange={handleInputChanged("height")}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Sheet>
  );
}
export default WallSizeForm;
