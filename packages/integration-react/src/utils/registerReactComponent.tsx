import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

type Options = {
	shadowRoot?: false | 'open' | 'closed' | ShadowRootInit;
	prefix?: string;
};

export function registerReactComponent(
	name: string,
	Component: (props: any) => ReactNode,
	options?: Options,
) {
	class WebComponent extends HTMLElement {
		constructor() {
			super();
		}

		connectedCallback() {
			const root = options?.shadowRoot
				? this.attachShadow(
						typeof options.shadowRoot === 'object'
							? options.shadowRoot
							: { mode: options.shadowRoot },
				  )
				: this;

			const props: Record<string, any> = Object.fromEntries(
				Array.from(this.attributes).map((item) => {
					const pair = [item.name, item.value];
					this.removeAttribute(item.name);

					return pair;
				}),
			);
			const children = this.innerHTML.trim();
			if (children !== '') {
				props.children = children;
			}

			createRoot(root).render(<Component {...props} />);
		}
	}

	const elementName = `${options?.prefix || 'react'}-${name}`;

	if (!customElements.get(elementName)) {
		customElements.define(elementName, WebComponent);
	}
}
