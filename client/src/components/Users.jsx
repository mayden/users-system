import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import SearchInput, {createFilter} from 'react-search-input'

import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};


const Users = ({
  errors,
  onSubmit,
  successMessage,
  currentUser,
  users,
  chosenUsers,
  onSearch,
  filteredUsers,
  handleCellClick
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Users Page</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div>
        <p> * You can search by username, fullname and city</p>
         <SearchInput className="search-input" onChange={onSearch} />

      </div>

      <div>
        <Table
            fixedHeader={true}
            fixedFooter={false}
            selectable={true}
            multiSelectable={true}
            onCellClick={handleCellClick}
        >
          <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={true}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Users List" style={{textAlign: 'center'}}>
                List of Users: (You can multiplie select by click)
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The ID">#</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Username">Username</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Full Name of the User">Full Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Resident City">City</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={true}
              showRowHover={false}
              stripedRows={true}
          >
            {filteredUsers.map( (row, index) => (
                <TableRow value={row.username} key={row._id}>
                  <TableRowColumn data-my-row-identifier={row._id}>{(index+1)}</TableRowColumn>
                  <TableRowColumn data-my-row-identifier={row._id}>{row.username}</TableRowColumn>
                  <TableRowColumn data-my-row-identifier={row._id}>{row.fullname}</TableRowColumn>
                  <TableRowColumn data-my-row-identifier={row._id}>{row.city}</TableRowColumn>
                </TableRow>
            ))}
          </TableBody>
          <TableFooter>
          </TableFooter>
        </Table>
      </div>
      <div className="button-line">
        <RaisedButton type="submit" label="Delete Selected Users" primary />
      </div>
  </form>
  </Card>
);

Users.propTypes = {
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  chosenUsers: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleCellClick: PropTypes.func.isRequired
};

export default Users;
