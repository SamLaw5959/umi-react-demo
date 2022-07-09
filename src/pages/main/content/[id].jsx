import React from 'react';
import { useParams } from 'umi';

export default function MainContentDetail() {
  const params = useParams();
  return (
    <div>
      <h2>Welcome to Main Content Detail {params.id}</h2>
    </div>
  );
}
