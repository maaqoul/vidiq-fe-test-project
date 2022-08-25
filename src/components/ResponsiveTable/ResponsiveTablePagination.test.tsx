import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResponsiveTablePagination from "./ResponsiveTablePagination";

test("should render pagination with right amount of buttons", () => {
  const onPaginateMock = jest.fn();
  render(
    <ResponsiveTablePagination
      keywordsPerPage={10}
      totalKeywords={50}
      onPaginate={onPaginateMock}
      pageNumber={1}
    />
  );
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(5);
  userEvent.click(buttons[2]);
  expect(onPaginateMock).toHaveBeenCalledWith(3);
});
