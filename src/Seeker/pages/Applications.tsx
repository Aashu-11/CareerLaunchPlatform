import React, { useState, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import {
  Building,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MoreVertical,
  ChevronRight,
  MessageSquare,
  FileText,
  Mail
} from 'lucide-react';

const MotionItem = forwardRef<HTMLDivElement, HTMLMotionProps<"div"> & { children: React.ReactNode }>((props, ref) => {
  return <motion.div ref={ref} {...props} />;
});

interface Application {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  appliedDate: string;
  logo: string;
}

interface Column {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: Application[];
}

interface Columns {
  [key: string]: Column;
}

const initialColumns: Columns = {
  applied: {
    id: 'applied',
    title: 'Applied',
    icon: Clock,
    color: 'blue',
    items: [
      {
        id: '1',
        company: 'Google',
        position: 'Senior React Developer',
        location: 'Mountain View, CA',
        salary: '$150,000 - $200,000',
        appliedDate: '2024-03-15',
        logo: 'https://logo.clearbit.com/google.com'
      },
      {
        id: '2',
        company: 'Microsoft',
        position: 'Frontend Engineer',
        location: 'Redmond, WA',
        salary: '$140,000 - $180,000',
        appliedDate: '2024-03-14',
        logo: 'https://logo.clearbit.com/microsoft.com'
      }
    ]
  },
  inReview: {
    id: 'inReview',
    title: 'In Review',
    icon: FileText,
    color: 'yellow',
    items: [
      {
        id: '3',
        company: 'Amazon',
        position: 'Full Stack Developer',
        location: 'Seattle, WA',
        salary: '$160,000 - $210,000',
        appliedDate: '2024-03-12',
        logo: 'https://logo.clearbit.com/amazon.com'
      }
    ]
  },
  interview: {
    id: 'interview',
    title: 'Interview',
    icon: Calendar,
    color: 'purple',
    items: [
      {
        id: '4',
        company: 'Apple',
        position: 'Senior Frontend Engineer',
        location: 'Cupertino, CA',
        salary: '$170,000 - $220,000',
        appliedDate: '2024-03-10',
        logo: 'https://logo.clearbit.com/apple.com'
      }
    ]
  },
  offer: {
    id: 'offer',
    title: 'Offer',
    icon: CheckCircle,
    color: 'green',
    items: [
      {
        id: '5',
        company: 'Netflix',
        position: 'UI Engineer',
        location: 'Los Gatos, CA',
        salary: '$180,000 - $230,000',
        appliedDate: '2024-03-08',
        logo: 'https://logo.clearbit.com/netflix.com'
      }
    ]
  },
  rejected: {
    id: 'rejected',
    title: 'Rejected',
    icon: XCircle,
    color: 'red',
    items: [
      {
        id: '6',
        company: 'Facebook',
        position: 'React Developer',
        location: 'Menlo Park, CA',
        salary: '$145,000 - $190,000',
        appliedDate: '2024-03-05',
        logo: 'https://logo.clearbit.com/facebook.com'
      }
    ]
  }
};

const Applications: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialColumns);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'text-blue-500',
      yellow: 'text-yellow-500',
      purple: 'text-purple-500',
      green: 'text-green-500',
      red: 'text-red-500'
    };
    return colorMap[color] || 'text-gray-500';
  };

  const getBgColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100',
      yellow: 'bg-yellow-100',
      purple: 'bg-purple-100',
      green: 'bg-green-100',
      red: 'bg-red-100'
    };
    return colorMap[color] || 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto flex gap-6">
        <div className="flex-1 grid grid-cols-5 gap-4">
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([columnId, column]) => (
              <div key={columnId} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <column.icon className={getColorClass(column.color)} />
                    <h2 className="font-semibold">{column.title}</h2>
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-sm">
                      {column.items.length}
                    </span>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                </div>

                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-3"
                    >
                      {column.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <MotionItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              onClick={() => setSelectedApplication(item)}
                              className={`bg-white rounded-lg p-3 border shadow-sm hover:shadow-md transition-shadow
                                ${snapshot.isDragging ? 'shadow-lg' : ''}
                                ${selectedApplication?.id === item.id ? 'ring-2 ring-purple-500' : ''}`}
                            >
                              <div className="flex items-start gap-3">
                                <img
                                  src={item.logo}
                                  alt={item.company}
                                  className="h-8 w-8 rounded-full"
                                />
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-medium text-sm truncate">
                                    {item.position}
                                  </h3>
                                  <p className="text-xs text-gray-600 truncate">
                                    {item.company}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                                <div className="flex items-center gap-1.5">
                                  <Building className="h-3.5 w-3.5" />
                                  <span className="truncate">{item.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>Applied {item.appliedDate}</span>
                                </div>
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-purple-600">
                                  {item.salary}
                                </span>
                                <button className="p-1 hover:bg-gray-100 rounded">
                                  <ChevronRight className="h-4 w-4 text-gray-400" />
                                </button>
                              </div>
                            </MotionItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </DragDropContext>
        </div>

        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 bg-white rounded-xl p-5 shadow-sm self-start sticky top-6"
          >
            <div className="flex items-start gap-4 mb-6">
              <img
                src={selectedApplication.logo}
                alt={selectedApplication.company}
                className="h-12 w-12 rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold truncate">
                  {selectedApplication.position}
                </h2>
                <p className="text-gray-600 truncate">{selectedApplication.company}</p>
                <p className="text-sm text-gray-500 truncate">
                  {selectedApplication.location}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h3 className="font-semibold mb-3 text-sm">Application Timeline</h3>
                <div className="space-y-3">
                  {[
                    {
                      date: '2024-03-15',
                      event: 'Application Submitted',
                      icon: Mail,
                      color: 'blue'
                    },
                    {
                      date: '2024-03-16',
                      event: 'Resume Reviewed',
                      icon: FileText,
                      color: 'yellow'
                    },
                    {
                      date: '2024-03-18',
                      event: 'Interview Scheduled',
                      icon: Calendar,
                      color: 'purple'
                    }
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className={`p-1.5 rounded-full ${getBgColorClass(event.color)}`}>
                        <event.icon className={`h-3.5 w-3.5 ${getColorClass(event.color)}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.event}</p>
                        <p className="text-xs text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm">Notes</h3>
                <textarea
                  className="w-full h-24 p-2.5 text-sm border rounded-lg resize-none
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Add notes about this application..."
                />
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center gap-1.5 p-2 bg-gray-50 
                                 rounded-lg hover:bg-gray-100 text-sm">
                    <MessageSquare className="h-4 w-4 text-purple-500" />
                    Follow-up
                  </button>
                  <button className="flex items-center gap-1.5 p-2 bg-gray-50 
                                 rounded-lg hover:bg-gray-100 text-sm">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    Schedule
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-sm">Documents</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 
                               bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Resume.pdf</span>
                    </div>
                    <button className="text-sm text-purple-600 hover:text-purple-700">
                      View
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-2.5 
                               bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Cover Letter.pdf</span>
                    </div>
                    <button className="text-sm text-purple-600 hover:text-purple-700">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Applications;