import { Button } from "./components/Button/Button";

import styles from "./App.module.css";

import "./global.css";

export const App = () => {
  return (
    <>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="success" />
      <Button variant="danger" />
      <Button />
    </>
  );
};


