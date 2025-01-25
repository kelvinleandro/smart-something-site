import React from 'react'
import DeviceCard from "@/components/device-card";
import { Devices } from "@/types/devices";

const DUMMY_DATA = [
  { type: Devices.AC, name: "AC", status: "23°C", level: 3, id: 1, max:3 },
  {
    type: Devices.CAR_LOC,
    name: "Car Location",
    status: {
      lat: 13.123,
      lng: 23.123,
    },
    id: 2,
  },
  { type: Devices.HEADLIGHT, name: "Headlight", status: "ON", id: 3 },
];

const DevicesSection = () => {
  return (
    <div className='w-full mt-4'>
      <div className='w-full lg:w-[50%] grid grid-cols-2 md:grid-cols-3 gap-4'>
        {DUMMY_DATA.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>
    </div>
  )
}

export default DevicesSection