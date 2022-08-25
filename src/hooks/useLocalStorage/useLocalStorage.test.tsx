import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useLocalStorage from "./useLocalStorage";

const UseLocalStorageExample = (): JSX.Element => {
  const [value, setValue] = useLocalStorage("key", "default value");
  return (
    <div>
      <div data-testid="ls-value">{value}</div>
      <input
        type="text"
        data-testid="ls-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

describe("useLocalStorageState hook", () => {
  it("render the example component with default value", () => {
    render(<UseLocalStorageExample />);
    expect(screen.getByTestId("ls-value")).toHaveTextContent("default value");
  });

  it("update the value of the key in local storage", () => {
    render(<UseLocalStorageExample />);
    const input = screen.getByTestId("ls-input");
    userEvent.clear(input);
    userEvent.type(input, "new value");
    expect(screen.getByTestId("ls-value")).toHaveTextContent("new value");
    expect(JSON.parse(localStorage.getItem("key") as string)).toBe("new value");
  });
});
