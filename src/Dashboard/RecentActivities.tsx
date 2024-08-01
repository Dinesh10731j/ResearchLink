import { UseUserActivities } from "../hooks/Usehistory"
const RecentActivities = () => {
  const userActivities = UseUserActivities();
  console.log(userActivities?.data)
  return (
    <>
    <section>
      <h1>This is Recent Activities</h1>
    </section>
    
    
    
    </>
  )
}

export default RecentActivities