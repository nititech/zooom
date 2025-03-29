# Zooom / React Integration

## Utilities

All utilities can be imported from `@zooom/integration-react/utils`.

### registerReactComponent

Use this utility to register a React component as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) and use it in your HTML or PHP website without the need to register a whole app root.

#### Parameters

```ts
registerReactComponent(
	name: string,
	Component: (props: any) => ReactNode,
	options?: Options,
): void;

type Options = {
	shadowRoot?: false | 'open' | 'closed' | ShadowRootInit;
	prefix?: string; // default - react
};
```

> **Attention!** \
> Props from the Web Component will be passed as strings to the React component! \
> Same thing goes for children: Children will read as `innerHTML.trim()` and passed to the React component.

#### Usage

```ts
// /src/components/ExampleComponent.tsx

import { registerReactComponent } from '@zooom/integration-react/utils';

type ExampleComponentProps = { class?: string; children?: string };

registerReactComponent(
	'example',
	function ExampleComponent({
		class: className,
		children,
	}: ExampleComponentProps) {
		return (
			<div
				className={className}
				dangerouslySetInnerHTML={{ __html: children }}
			/>
		);
	},
);
```

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
	</head>
	<body>
		<react-example
			class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
		>
			Some content in here
		</react-example>
		<script
			type="module"
			src="/src/components/ExampleComponent.tsx"
		></script>
	</body>
</html>
```
