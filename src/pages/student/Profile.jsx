import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, GraduationCap, IdCard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';

function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: '+1 (555) 123-4567',
    address: '123 College Street, University City, UC 12345',
    emergencyContact: '+1 (555) 987-6543',
    bloodGroup: 'O+',
    dateOfBirth: '1999-05-15'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">My Profile</CardTitle>
              <CardDescription>View and update your personal information</CardDescription>
            </div>
            <div className="flex space-x-2">
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Avatar className="mx-auto h-24 w-24 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user?.full_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl mb-1">{user?.full_name}</CardTitle>
              <p className="text-muted-foreground mb-3">{user?.email}</p>
              <div className="space-y-2">
                <Badge variant="secondary" className="text-xs">
                  <IdCard className="h-3 w-3 mr-1" />
                  STU001
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  CSE - Semester 6
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-input rounded-lg bg-muted text-muted-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-input rounded-lg ${
                    isEditing ? 'bg-background focus:ring-2 focus:ring-ring' : 'bg-muted text-muted-foreground'
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className={`w-full px-3 py-2 border border-input rounded-lg ${
                    isEditing ? 'bg-background focus:ring-2 focus:ring-ring' : 'bg-muted text-muted-foreground'
                  }`}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-input rounded-lg ${
                    isEditing ? 'bg-background focus:ring-2 focus:ring-ring' : 'bg-muted text-muted-foreground'
                  }`}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-input rounded-lg ${
                    isEditing ? 'bg-background focus:ring-2 focus:ring-ring' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-input rounded-lg ${
                    isEditing ? 'bg-background focus:ring-2 focus:ring-ring' : 'bg-muted text-muted-foreground'
                  }`}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
          <CardDescription>Your academic details and enrollment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2">Student ID</label>
              <input
                type="text"
                value="STU001"
                disabled
                className="w-full px-3 py-2 border border-input rounded-lg bg-muted text-muted-foreground"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2">Department</label>
              <input
                type="text"
                value="Computer Science Engineering"
                disabled
                className="w-full px-3 py-2 border border-input rounded-lg bg-muted text-muted-foreground"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2">Current Semester</label>
              <input
                type="text"
                value="6"
                disabled
                className="w-full px-3 py-2 border border-input rounded-lg bg-muted text-muted-foreground"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;