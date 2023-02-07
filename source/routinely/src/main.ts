import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import '@cds/core/icon/register.js'
import '@cds/core/button/register.js'
import {ClarityIcons, cogIcon} from '@cds/core/icon';
import {clockIcon} from '@cds/core/icon';
ClarityIcons.addIcons(cogIcon);
ClarityIcons.addIcons(clockIcon);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
