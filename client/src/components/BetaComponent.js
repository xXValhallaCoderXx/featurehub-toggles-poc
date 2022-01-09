import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BetaFeature() {
  return (
    <Box>
      <Typography variant="h4" mt={2} mb={1} textAlign="center">
        THIS IS A BETA COMPONENT
      </Typography>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            BETA FEATURE
          </Typography>

          <Typography variant="body2">
            THIS IS ONLYH EVER SEEN FOR BETA USER
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
