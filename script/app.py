from flask import Flask, request,jsonify
import pandas as pd
import time

app = Flask(__name__)

@app.route('/processCsv', methods=['GET'])
def processInput():
    # Extract the file from the request
    print(request.args)
    filePath = request.args['file_path']
    
    filePath="../"+filePath
    # process the file whose path is given
    data=processCsv(filePath)

    return jsonify(data)

def processCsv(filePath):
    import pandas as pd
    import matplotlib.pyplot as plt
    import time

    now = int( time.time() )
    # Read the CSV file
    df = pd.read_csv(filePath)

    # Perform column-wise analysis
    column_stats = df.describe()

    # Plot the column statistics
    plt.figure(figsize=(10, 6))
    column_stats.plot(kind='bar')
    plt.title('Column-wise Analysis')
    plt.xlabel('Statistics')
    plt.ylabel('Values')
    plt.xticks(rotation=0)
    plt.legend(loc='upper right')
    plt.tight_layout()
    processedFilePath=f'../client/uploads/column_analysis{now}.png'
    # Save the plot as an image
    Row_list =[]
  
    # Iterate over each row
    for index, rows in df.iterrows():
        # Create list for the current row
        print(rows)
        my_list =rows.to_list()
      
        # append the list to the final list
        Row_list.append(my_list)
  
    # Print the list
    print(Row_list[:5])

    plt.savefig(processedFilePath)
    output={
        "columns":list(df.columns),
        "processed_file_path":f'./client/uploads/column_analysis{now}.png',
        "rows":Row_list[:5],
    }
    return output

if __name__ == '__main__':
    app.run()






