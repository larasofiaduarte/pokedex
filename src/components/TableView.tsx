import React from 'react';



function TableView() {
    return (
        <div>
            <h2>Static Table Example</h2>
            <table>
                <thead>
                <tr>
                    <th>Img</th>
                    <th>Name</th>
                    <th>Evolutions</th>
                    <th>Type</th>
                    <th>Moves</th>
                    <th>Weight</th>
                    <th>Height</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>John</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jane</td>
                    <td>28</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Bob</td>
                    <td>35</td>
                </tr>
                </tbody>
            </table>
        </div>

    );
}

export default TableView;