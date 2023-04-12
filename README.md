* Create an Analytics page that includes a Date Picker component that allows the user to select a date range. When the user selects a date range, make a REST API call to fetch the data for the selected date range.

* Create a Reusable Analytics Table Component that displays the data fetched from the API endpoint. Allow the user to enable or disable a particular column from view by creating a checkbox for each column. When the user toggles a checkbox, hide or show the corresponding column in the table. Also, allow the user to reorder the columns by dragging and dropping them.

* Implement data formatting for each cell in the table to make it easier to read.

* Implement sorting and filtering for the table by adding sorting and filtering options for each column. When the user clicks on a column header, sort the data in ascending or descending order. When the user enters a search term in the filter field, filter the data based on the search term.

* Make the table responsive by implementing CSS media queries.

* Optionally, implement a reusable data cache layer to avoid calling the API again if the data has been queried recently. Also, create a shareable table link that populates the table with all filters and columns.

* Use React and Redux to build the table component and manage the state of the table. Use best practices and write clean code to ensure the quality of your code.

* Minimize the use of third-party libraries for other components to keep the project lightweight.

* The table columns should include Date, App Name, AD Request, AD Response, Impression, Clicks, Revenue, Fill Rate, and CTR.

* Use the provided API to fetch the data for the table. Use the Get All report by date API endpoint to fetch data for a selected date range and the Get All apps API endpoint to get the list of all apps.
