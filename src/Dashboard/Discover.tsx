import React, { useState, useMemo } from "react";
import { UseGetResearchLinkUsers } from "../hooks/Useresearchlinkusers";
import { UseSendRequest } from "../hooks/Usesendrequest";
import { CircularProgress, Box, Grid, Typography, Card, CardMedia, CardContent, CardActions, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  profile: string;
  profilePicture: string;
  researchField: string;
  affiliation: string;
 status:String,
}

const UserCard: React.FC<{ user: User; sendRequest: (id: string) => void }> = ({ user, sendRequest }) => (

  <Card className="flex flex-col justify-between h-full">
    <div>
      <CardMedia
        component="img"
        height="120"
        image={user.profilePicture}
        alt={user.name}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.profile}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.researchField}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.affiliation}
        </Typography>
      </CardContent>
    </div>
    <CardActions>
      <Button size="small" color="primary" onClick={() => sendRequest(user._id)}>
      Send Request
      </Button>
      <Link to={`/dashboard/user-profile/${user?._id}`}>
        <Button size="small" color="primary">
          View Profile
        </Button>
      </Link>
    </CardActions>
  </Card>
);

const Discover: React.FC = () => {
  const Users = UseGetResearchLinkUsers();
  const sendRequestMutation = UseSendRequest();
  const [searchQuery, setSearchQuery] = useState("");

  const sendRequest = (userid:any) => {
    sendRequestMutation.mutate(userid);
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery) return Users.data;
    return Users.data.filter((user: User) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.researchField.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.affiliation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, Users.data]);

  return (
    <Box p={3}>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {Users.isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : Users.isError ? (
        <Typography variant="h6" color="error">
          Error loading users.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredUsers.map((user: User) => (
            <Grid item key={user._id} xs={12} sm={6} md={4}>
              <div className="h-full">
                <UserCard user={user} sendRequest={sendRequest} />
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Discover;
