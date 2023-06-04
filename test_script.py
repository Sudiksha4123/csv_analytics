import pandas as pd
import matplotlib.pyplot as plt

# Read the CSV file
data = pd.read_csv('test.csv')

# Perform column-wise analysis
column_stats = data.describe()

# Plot the column statistics
plt.figure(figsize=(10, 6))
column_stats.plot(kind='bar')
plt.title('Column-wise Analysis')
plt.xlabel('Statistics')
plt.ylabel('Values')
plt.xticks(rotation=0)
plt.legend(loc='upper right')
plt.tight_layout()

# Save the plot as an image
plt.savefig('column_analysis.png')




