import React from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

interface SwitchProps {
  animationClassName: string;
  animationTimeout: number;
  children: JSX.Element;
}

export const AnimatedSwitch = ({
  animationClassName,
  animationTimeout,
  children
}: SwitchProps) => (
  <Route
    render={({ location }) => (
      <TransitionGroup
        style={{
          flex: 1,
          position: "relative"
        }}
      >
        <CSSTransition
          key={location.key}
          timeout={animationTimeout}
          classNames={animationClassName}
        >
          <Switch location={location}>{children}</Switch>
        </CSSTransition>
      </TransitionGroup>
    )}
  />
);
