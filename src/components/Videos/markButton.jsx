import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MarkButton = ( ) => { 

    const handleMarkAsProcessed = async () => {

        try {
          const response = await axios.put(`${process.env.REACT_APP_API_URL}api/post/mark-as-processed`, {
            videoId: video._id,
          });
          if (response.status === 200) {
            setVideo({ ...video, traite: true });
            alert('Video marked as processed');
          } else {
            console.error('Failed to mark video as processed:', response.statusText);
            alert('Failed to mark video as processed');
          }
        } catch (error) {
          console.error('Error marking video as processed:', error);
          alert('Failed to mark video as processed');
        }
      };

      return (
        <div>
            
        </div>
      );
}