/*
  Function to update the task attributes specific
  to Insights 
*/
export function updateTaskAttributesForInsights(task: any, handlingTeam: string) {
  const { attributes } = task;
  const updatedAttributes = Object.assign(attributes, {
    conversations: Object.assign(attributes.conversations, {
      handling_team_name: handlingTeam,
      handling_team_id: handlingTeam,
    }),
  });
  task.setAttributes(updatedAttributes);
}
