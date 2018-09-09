import * as React from 'react'

export type Renderable<T> = React.ComponentType<T | void> | React.ReactNode

export type RenderResult<T = any> = React.ReactElement<T> | null

export interface RenderOptions {
  cloneElement?: boolean
}

export function createRender<P, T = any>(
  renderable?: Renderable<P>,
  options?: RenderOptions,
): ((...args: [any]) => RenderResult)

export default function render<P, T = any>(
  renderable?: Renderable<P>,
  props?: P,
  options?: RenderOptions,
): RenderResult<T>
