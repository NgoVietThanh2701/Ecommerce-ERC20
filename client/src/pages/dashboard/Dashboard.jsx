import React from "react";
import InfoCard from "../../components/dashboard/Cards/InfoCard";
import ChartCard from "../../components/dashboard/Chart/ChartCard";
import ChartLegend from "../../components/dashboard/Chart/ChartLegend";
// import { Doughnut, Line } from "react-chartjs-2";
import PageTitle from "../../components/dashboard/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../../assets/dashboard/icons";
import RoundIcon from "../../components/dashboard/RoundIcon";
import { doughnutOptions, lineOptions, doughnutLegends, lineLegends } from "../../utils/demo/chartsData";
import OrdersTable from "../../components/dashboard/OrdersTable";

const Dashboard = () => {
   return (
      <>
         <PageTitle>Dashboard</PageTitle>

         {/* <!-- Cards --> */}
         <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <InfoCard title="Total customers" value="765">
               <RoundIcon
                  icon={PeopleIcon}
                  iconColorClass="text-orange-500 dark:text-orange-100"
                  bgColorClass="bg-orange-100 dark:bg-orange-500"
                  className="mr-4"
               />
            </InfoCard>

            <InfoCard title="Total income" value="$ 6,760.89">
               <RoundIcon
                  icon={MoneyIcon}
                  iconColorClass="text-green-500 dark:text-green-100"
                  bgColorClass="bg-green-100 dark:bg-green-500"
                  className="mr-4"
               />
            </InfoCard>

            <InfoCard title="New Orders" value="150">
               <RoundIcon
                  icon={CartIcon}
                  iconColorClass="text-blue-500 dark:text-blue-100"
                  bgColorClass="bg-blue-100 dark:bg-blue-500"
                  className="mr-4"
               />
            </InfoCard>

            <InfoCard title="Unread Chats" value="15">
               <RoundIcon
                  icon={ChatIcon}
                  iconColorClass="text-teal-500 dark:text-teal-100"
                  bgColorClass="bg-teal-100 dark:bg-teal-500"
                  className="mr-4"
               />
            </InfoCard>
         </div>

         <PageTitle>Orders</PageTitle>
         <OrdersTable resultsPerPage={10} />
      </>
   );
}

export default Dashboard;
