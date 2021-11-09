import React from 'react';
import { useSelector } from 'react-redux';
import Workspace from './Workspace';
import onMount from './onMount.js';

let Script = ({ 
	id,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const isExists = useSelector((state) => !!state.script[id]);
	const workspaceId = React.useMemo(() => isExists
		? Date.now()
		: id, [
		isExists,
		id,
	]);

	React.useEffect(() => onMount(id, workspaceId), [
		id,
		workspaceId,
	]);

	return <React.Fragment>
		<Workspace 
			scriptId={id}
			workspaceId={workspaceId}
			isSource={isSource}
			dataTypeValidating={dataTypeValidating}
			onClickAsSource={onClickAsSource} />
	</React.Fragment>;
};

Script = React.memo(Script);
Script.defaultProps = {
	id: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

export default Script;
