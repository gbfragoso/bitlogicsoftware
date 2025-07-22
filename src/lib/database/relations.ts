import { relations } from "drizzle-orm/relations";
import { users, services, professionals, sessions, customers, events, serviceHasProfessional } from "./schema";

export const servicesRelations = relations(services, ({one, many}) => ({
	user: one(users, {
		fields: [services.userId],
		references: [users.id]
	}),
	professional: one(professionals, {
		fields: [services.professionalId],
		references: [professionals.id]
	}),
	events: many(events),
	serviceHasProfessionals: many(serviceHasProfessional),
}));

export const usersRelations = relations(users, ({many}) => ({
	services: many(services),
	sessions: many(sessions),
	customers: many(customers),
	professionals: many(professionals),
}));

export const professionalsRelations = relations(professionals, ({one, many}) => ({
	services: many(services),
	user: one(users, {
		fields: [professionals.userId],
		references: [users.id]
	}),
	events: many(events),
	serviceHasProfessionals: many(serviceHasProfessional),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const customersRelations = relations(customers, ({one, many}) => ({
	user: one(users, {
		fields: [customers.userId],
		references: [users.id]
	}),
	events: many(events),
}));

export const eventsRelations = relations(events, ({one}) => ({
	professional: one(professionals, {
		fields: [events.professionalId],
		references: [professionals.id]
	}),
	customer: one(customers, {
		fields: [events.customerId],
		references: [customers.id]
	}),
	service: one(services, {
		fields: [events.serviceId],
		references: [services.id]
	}),
}));

export const serviceHasProfessionalRelations = relations(serviceHasProfessional, ({one}) => ({
	service: one(services, {
		fields: [serviceHasProfessional.service],
		references: [services.id]
	}),
	professional: one(professionals, {
		fields: [serviceHasProfessional.professional],
		references: [professionals.id]
	}),
}));