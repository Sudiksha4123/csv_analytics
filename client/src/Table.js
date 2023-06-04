
import './Table.css';
 
function Table(column_list,row_list) {
    console.log(column_list)
    console.log(row_list)
    if(column_list && row_list){
return (
<div className="Table">
    <table>
        <tr>
            {column_list.length!=0?
                column_list.map((value,index) => {
                    return (
                        <th key={index}>
                        {value}
                        </th>
                    );
                }):null
            }
        </tr>
            {
                row_list.map((row,index) => {
                    console.log(row)
                    return (
                    <tr key={index}>
                        {
                            row.map((value,ind) => {
                                return (
                                <td key={value+ind}>
                                    {value}
                                </td>
                                );
                            })
                        }
                        </tr>
                    );

                })
            }
    </table>
</div>
);
} else {
    return null;
}
}
 
export default Table;