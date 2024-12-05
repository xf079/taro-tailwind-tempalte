import { CSSTransition } from 'react-transition-group';
import React, { FC, ReactNode, useCallback, useMemo, useRef } from 'react';
import { EnterHandler, ExitHandler } from 'react-transition-group/Transition';

export const TransitionName = {
  Fade: 'fade',
  FadeScale: 'fade-scale',
  SlideUp: 'slide-up',
  SlideDown: 'slide-down',
  SlideLeft: 'slide-left',
  SlideRight: 'slide-right'
} as const;

export type TransitionNameType = (typeof TransitionName)[keyof typeof TransitionName];

export interface TransitionProps {
  /**
   * @description 控制组件是否打开
   */
  open: boolean;

  /**
   * @description 默认情况下是否打开
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * @description 过渡动画的名称类型
   */
  name?: TransitionNameType; // 过渡动画的名称类型
  /**
   * @description 动画持续时间
   * @default 300
   */
  duration?: number; // 动画持续时间
  /**
   * @description 是否在初次挂载时应用动画
   * @default false
   */
  appear?: boolean; // 是否在初次挂载时应用动画
  /**
   * @description 默认情况下，子组件与父 Transition 组件一起立即挂载。
   * 如果希望在第一次 `in={true}` 时“延迟挂载”组件，可以设置 `mountOnEnter`。
   * 在第一次进入过渡后，组件将保持挂载状态，即使在“退出”状态，除非同时指定 `unmountOnExit`。
   * @default false
   */
  mountOnEnter?: boolean | undefined;

  /**
   * @description 默认情况下，子组件在达到“退出”状态后仍保持挂载。
   * 如果希望在退出完成后卸载组件，可以设置 `unmountOnExit`。
   * @default false
   */
  unmountOnExit?: boolean | undefined;

  /**
   * @description 在应用“进入中”状态之前触发的回调。
   * 提供一个额外的参数 `isAppearing`，用于指示进入阶段是否发生在初次挂载时。
   */
  onEnter?: EnterHandler<HTMLElement> | undefined;

  /**
   * @description 在应用“进入中”状态之后触发的回调。
   * 提供一个额外的参数 `isAppearing`，用于指示进入阶段是否发生在初次挂载时。
   */
  onEntering?: EnterHandler<HTMLElement> | undefined;

  /**
   * @description 在应用“已进入”状态之后触发的回调。
   * 提供一个额外的参数 `isAppearing`，用于指示进入阶段是否发生在初次挂载时。
   */
  onEntered?: EnterHandler<HTMLElement> | undefined;

  /**
   * @description 在应用“退出中”状态之前触发的回调。
   */
  onExit?: ExitHandler<HTMLElement> | undefined;

  /**
   * @description 在应用“退出中”状态之后触发的回调。
   */
  onExiting?: ExitHandler<HTMLElement> | undefined;

  /**
   * @description 在应用“已退出”状态之后触发的回调。
   */
  onExited?: ExitHandler<HTMLElement> | undefined;
  /**
   * @description 子组件
   */
  children?: ReactNode;
}

export const Transition: FC<TransitionProps> = (props) => {
  const { open, name = 'fade', duration = 300, children, ...restProps } = props;

  const nodeRef = useRef(null);

  const classNames = useMemo(() => {
    const fillMode = 'fill-mode-both';
    const fadeIn = 'animate-fade-in';
    const fadeOut = 'animate-fade-out';
    const scaleEnter = 'animate-scale-enter';
    const scaleExit = 'animate-scale-exit';
    const slideUpEnter = 'animate-slide-up-enter';
    const slideUpExit = 'animate-slide-up-exit';
    const slideDownEnter = 'animate-slide-down-enter';
    const slideDownExit = 'animate-slide-down-exit';
    const slideLeftEnter = 'animate-slide-left-enter';
    const slideLeftExit = 'animate-slide-left-exit';
    const slideRightEnter = 'animate-slide-right-enter';
    const slideRightExit = 'animate-slide-right-exit';

    switch (name) {
      case TransitionName.Fade:
        return {
          appearActive: `${fadeIn} ${fillMode}`,
          enterActive: `${fadeIn} ${fillMode}`,
          exitActive: `${fadeOut} ${fillMode}`
        };
      case TransitionName.FadeScale:
        return {
          appearActive: `${scaleEnter} ${fillMode}`,
          enterActive: `${scaleEnter} ${fillMode}`,
          exitActive: `${scaleExit} ${fillMode}`
        };
      case TransitionName.SlideUp:
        return {
          appearActive: `${slideUpEnter} ${fillMode}`,
          enterActive: `${slideUpEnter} ${fillMode}`,
          exitActive: `${slideUpExit} ${fillMode}`
        };
      case TransitionName.SlideDown:
        return {
          appearActive: `${slideDownEnter} ${fillMode}`,
          enterActive: `${slideDownEnter} ${fillMode}`,
          exitActive: `${slideDownExit} ${fillMode}`
        };
      case TransitionName.SlideLeft:
        return {
          appearActive: `${slideLeftEnter} ${fillMode}`,
          enterActive: `${slideLeftEnter} ${fillMode}`,
          exitActive: `${slideLeftExit} ${fillMode}`
        };
      case TransitionName.SlideRight:
        return {
          appearActive: `${slideRightEnter} ${fillMode}`,
          enterActive: `${slideRightEnter} ${fillMode}`,
          exitActive: `${slideRightExit} ${fillMode}`
        };
      default:
        return {
          appearActive: `${fadeIn} ${fillMode}`,
          enterActive: `${fadeIn} ${fillMode}`,
          exitActive: `${fadeOut} ${fillMode}`
        };
    }
  }, [name, duration]);

  const getChildren = useCallback(() => {
    if (Array.isArray(children) || !React.isValidElement(children)) {
      return null;
    }
    return React.cloneElement(children, {
      ...children.props,
      ref: nodeRef,
      style: { '--duration': `${duration}ms`, ...children.props.style }
    });
  }, [children, duration]);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={open}
      timeout={duration}
      appear
      mountOnEnter
      unmountOnExit
      classNames={classNames}
      {...restProps}
    >
      {getChildren()}
    </CSSTransition>
  );
};
