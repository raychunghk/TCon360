import pandas as pd
from bokeh.io import output_file, show
from bokeh.models import ColumnDataSource
from bokeh.plotting import figure
# Load Excel file into a pandas dataframe
df = pd.read_excel("/config/workspace/vm/js/NxTime/timesheet/T26TimeSheet_20230605.xlsx")

source = ColumnDataSource(df)

# Create a Bokeh figure object with a scatter plot of the data
fig = figure(title="Data Scatter Plot", x_axis_label="X", y_axis_label="Y")
fig.scatter(x="X", y="Y", source=source)

# Set the output file and show the plot
output_file("output.html")
show(fig)