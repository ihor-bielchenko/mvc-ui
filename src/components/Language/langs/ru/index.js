import * as route from './route.js';
import * as operatorIf from './operatorIf.js';
import * as operatorJoin from './operatorJoin.js';
import * as bool from './bool.js';
import * as cron from './cron.js';
import * as datetime from './datetime.js';
import * as json from './json.js';
import * as method from './method.js';
import * as numeric from './numeric.js';
import * as onStop from './onStop.js';
import * as other from './other.js';
import * as param from './param.js';
import * as path from './path.js';
import * as placeholders from './placeholders.js';
import * as protocol from './protocol.js';
import * as responsestatus from './responsestatus.js';
import * as scale from './scale.js';
import * as search from './search.js';
import * as server from './server.js';
import * as SourceProxyPass from './SourceProxyPass.js';
import * as sourcerand from './sourcerand.js';
import * as statuses from './statuses.js';
import * as texteditor from './texteditor.js';
import * as typeinput from './typeinput.js';
import * as url from './url.js';
import * as ActWithProjects from './Main/ActWithProjects.js';
import * as databasa from './Main/databasa.js';
import * as main from './Main/main.js';
import * as ServiceType from './Main/ServiceType.js';
import * as ifbase from './If/ifbase.js';
import * as ifint from './If/ifint.js';
import * as DbFieldForm from './Db/DbFieldForm.js';
import * as DbFile from './Db/DbFile.js';
import * as DbQuery from './Db/DbQuery.js';
import * as DbRowForm from './Db/DbRowForm.js';
import * as DbSelect from './Db/DbSelect.js';
import * as DbValue from './Db/DbValue.js';
import * as buttons from './Buttons/buttons.js';
import * as account from './Account/account.js';
import * as IP from './Account/IP.js';
import * as Mac from './Account/Mac.js';
import * as mail from './Account/mail.js';
import * as func from './func.js';
import * as dialog from './dialog.js';

const langs = () => ({
	...route,
	...operatorIf,
	...operatorJoin,
	...bool,
	...cron,
	...datetime,
	...json,
	...method,
	...numeric,
	...onStop,
	...other,
	...param,
	...path,
	...placeholders,
	...protocol,
	...responsestatus,
	...scale,
	...search,
	...server,
	...SourceProxyPass,
	...sourcerand,
	...statuses,
	...texteditor,
	...typeinput,
	...url,
	...ActWithProjects,
	...databasa,
	...main,
	...ServiceType,
	...ifbase,
	...ifint,
	...DbFieldForm,
	...DbFile,
	...DbQuery,
	...DbRowForm,
	...DbSelect,
	...DbValue,
	...buttons,
	...account,
	...IP,
	...Mac,
	...mail,
	...func,
	...dialog,
});

export default langs;
