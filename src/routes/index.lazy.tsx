import CalculateIcon from "@mui/icons-material/PlayArrowOutlined";
import { Button, Divider, Grid, Sheet } from "@mui/joy";
import { createLazyFileRoute } from "@tanstack/react-router";
import MountingForm from "../components/MountingForm";
import TileSizeForm from "../components/TileSizeForm";
import WallSizeForm from "../components/WallSizeForm";
import TilePreview from "../components/TilePreview";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <Grid container>
      <Grid xs={12} sm={3}>
        <WallSizeForm />
        <Divider />
        <TileSizeForm />
        <Divider />
        <MountingForm />
        <Divider />
        <Sheet
          sx={{
            p: 4,
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button fullWidth size="lg" endDecorator={<CalculateIcon />}>
            Calculate
          </Button>
        </Sheet>
      </Grid>
      <Grid xs={12} sm={6}>
        <TilePreview />
      </Grid>
      <Grid xs={12} sm={3}>
        outputs?
      </Grid>
    </Grid>
  );
}
