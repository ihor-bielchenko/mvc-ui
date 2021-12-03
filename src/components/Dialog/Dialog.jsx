import React from 'react';
import { withRouter } from 'react-router-dom';
import DeleteConfirm from './DeleteConfirm';
import Prop from './Prop';
import Condition from './Condition';
import Func from './Func';
import Json from './Json';
import SourceDb from './SourceDb';
import SourceProxy from './SourceProxy';
import SourceHeader from './SourceHeader';
import SourceRequest from './SourceRequest';
import SourceCookie from './SourceCookie';
import SourcePlaceholder from './SourcePlaceholder';
import SourceScript from './SourceScript';
import DbQuery from './DbQuery';
import KeyExists from './KeyExists';
import DbTable from './DbTable';
import DbColumn from './DbColumn';
import DbRow from './DbRow';
import DbProps from './DbProps';
import ServiceTemplate from './ServiceTemplate';
import ProjectForm from './ProjectForm';
import UrlValue from './UrlValue';
import UrlPlaceholder from './UrlPlaceholder';
import Build from './Build';
import { 
	URL_PAGE_DASHBOARD,
	URL_PAGE_SERVICE,
	URL_PAGE_SCRIPT,
	URL_PAGE_DB, 
	URL_PAGE_API, 
} from 'consts/url.js';

let Root = ({ 
	location, 
	children, 
}) => {
	const url = location.pathname.split('/');

	return <React.Fragment>
		<DeleteConfirm />
		{(() => {
			if (url.length === 4
				&& url[2] === URL_PAGE_SERVICE
				&& url[3] > 0) {
				return <React.Fragment>
					<Build />
				</React.Fragment>;
			}
			switch (url[4]) {
				case URL_PAGE_DB:
					return <React.Fragment>
						<DbTable />
						<DbColumn />
						<DbRow />
						<DbProps />
					</React.Fragment>;
				case URL_PAGE_API:
					return <React.Fragment>
						<UrlValue />
						<UrlPlaceholder />
						{(() => {
							switch (url[6]) {
								case URL_PAGE_SCRIPT:
									return <React.Fragment>
										<Prop />
										<Condition />
										<Func />
										<Json />
										<SourceDb />
										<DbQuery />
										<KeyExists />
										<SourceProxy />
										<SourceHeader />
										<SourceRequest />
										<SourceCookie />
										<SourcePlaceholder />
										<SourceScript />
									</React.Fragment>;
								default:
									break;
							}
							return <React.Fragment />;
						})()}
					</React.Fragment>;
				default:
					break;
			}
			switch (url[1]) {
				case URL_PAGE_DASHBOARD:
					return <React.Fragment>
						<ServiceTemplate />
						<ProjectForm />
					</React.Fragment>;
				default:
					break;
			}
			return <React.Fragment />;
		})()}
		{children}
	</React.Fragment>;
};

Root = withRouter(React.memo(Root));

export default Root;
