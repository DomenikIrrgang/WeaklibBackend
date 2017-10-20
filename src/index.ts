import weaklibBackend from "./WeaklibBackend";
import { config } from "./config/Config";
import { LogLevel } from "./logging/LogLevel";

const port = process.env.PORT || config.app.port;

weaklibBackend.listen(port, (error: any) => {
    if (error) {
        config.app.logger.log(LogLevel.ERROR, error);
    }
    config.app.logger.log(LogLevel.SUCCESS, `server is listening on ${port}`);
});