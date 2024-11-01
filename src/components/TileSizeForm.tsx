import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Option,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";
import { MULTIHOLE_SIZE_INCHES, MULTIHOLE_SIZE_MM } from "../config/Board";
import { TileOption, tileSizeConfig } from "../config/tiles";
import { Units } from "../config/units";
import { useGlobalStore } from "../lib/globalStore/globalStore";

function TileSizeForm() {
  const { units, tileSize, setTileSize } = useGlobalStore((state) => ({
    units: state.units,
    tileSize: state.tileSize,
    setTileSize: state.setTileSize,
  }));

  const requiredSpace = getRequiredSpace({
    units,
    tileSize,
  });

  return (
    <Sheet sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography level="title-lg">Tile Size</Typography>
        </Grid>
        <Grid xs={12}>
          <FormControl>
            <FormLabel>Tile Size</FormLabel>
            <Select
              value={tileSize}
              onChange={(_event, newValue) =>
                newValue && setTileSize(newValue as keyof typeof tileSizeConfig)
              }
            >
              {Object.entries(tileSizeConfig).map(
                ([tileSizeID, tileSizeConfig]) => (
                  <Option key={tileSizeID} value={tileSizeID}>
                    {tileSizeConfig.label}
                  </Option>
                )
              )}
            </Select>
            <FormHelperText>{requiredSpace}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </Sheet>
  );
}

/** Get the required space in the specified unit in format widthxheight */
export function getRequiredSpace({
  units,
  tileSize,
}: {
  units: Units;
  tileSize: TileOption;
}) {
  const tileOptionConfig = tileSizeConfig[tileSize];
  switch (units) {
    case "inch":
      const xValue = (tileOptionConfig.x * MULTIHOLE_SIZE_INCHES).toFixed(2);
      const yValue = (tileOptionConfig.y * MULTIHOLE_SIZE_INCHES).toFixed(2);
      return `${xValue}x${yValue}`;
    case "mm":
      return `${tileOptionConfig.x * MULTIHOLE_SIZE_MM}x${tileOptionConfig.y * MULTIHOLE_SIZE_MM}`;
  }
}

export default TileSizeForm;
